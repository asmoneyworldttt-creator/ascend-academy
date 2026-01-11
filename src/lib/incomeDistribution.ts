import { supabase } from "@/integrations/supabase/client";

interface IncomeSettings {
  referral_commission: number;
  spillover_level_1: number;
  spillover_level_2: number;
  spillover_level_3: number;
  spillover_level_4: number;
  revenue_share_level_1: number;
  revenue_share_level_2: number;
  revenue_share_level_3: number;
  revenue_share_level_4: number;
  revenue_share_level_5: number;
  revenue_share_level_6: number;
  revenue_share_level_7: number;
  revenue_share_level_8: number;
  level_1_income: number;
  level_2_income: number;
  level_3_income: number;
  level_4_income: number;
  level_5_income: number;
  level_6_income: number;
  level_7_income: number;
  level_8_income: number;
  level_9_income: number;
  level_10_income: number;
  level_11_income: number;
  level_12_income: number;
}

// Get income settings for a package
export const getIncomeSettings = async (packageName: string): Promise<IncomeSettings | null> => {
  const { data, error } = await supabase
    .from('income_settings')
    .select('*')
    .eq('package_name', packageName)
    .single();

  if (error) {
    console.error('Error fetching income settings:', error);
    return null;
  }

  return data;
};

// Credit wallet and log transaction
export const creditWallet = async (
  userId: string,
  amount: number,
  description: string,
  incomeType: string,
  levelNumber?: number,
  fromUserId?: string
) => {
  try {
    // Update agent_income wallet
    const { data: existingIncome } = await supabase
      .from('agent_income')
      .select('wallet, total_income')
      .eq('user_id', userId)
      .single();

    if (existingIncome) {
      await supabase
        .from('agent_income')
        .update({
          wallet: existingIncome.wallet + amount,
          total_income: existingIncome.total_income + amount
        })
        .eq('user_id', userId);
    } else {
      await supabase
        .from('agent_income')
        .insert({
          user_id: userId,
          wallet: amount,
          total_income: amount
        });
    }

    // Log in wallet_history
    await supabase
      .from('wallet_history')
      .insert({
        user_id: userId,
        amount: amount,
        description: description,
        status: 'credit',
        income_type: incomeType,
        level_number: levelNumber,
        from_user_id: fromUserId
      });

    return true;
  } catch (error) {
    console.error('Error crediting wallet:', error);
    return false;
  }
};

// Distribute Referral Income to direct sponsor
export const distributeReferralIncome = async (
  buyerId: string,
  packageName: string,
  settings: IncomeSettings
) => {
  // Get buyer's sponsor
  const { data: buyer } = await supabase
    .from('profiles')
    .select('sponsor_id, referred_by, full_name')
    .eq('user_id', buyerId)
    .single();

  if (!buyer?.sponsor_id && !buyer?.referred_by) {
    console.log('No sponsor found for buyer');
    return;
  }

  const sponsorProfileId = buyer.sponsor_id || buyer.referred_by;
  
  // Get sponsor's user_id
  const { data: sponsor } = await supabase
    .from('profiles')
    .select('user_id, full_name')
    .eq('id', sponsorProfileId)
    .single();

  if (!sponsor) {
    console.log('Sponsor profile not found');
    return;
  }

  const amount = settings.referral_commission;
  if (amount > 0) {
    await creditWallet(
      sponsor.user_id,
      amount,
      `Referral Income - ${packageName} Package from ${buyer.full_name || 'User'}`,
      'referral',
      undefined,
      buyerId
    );
    console.log(`Credited ₹${amount} referral income to ${sponsor.full_name}`);
  }
};

// Distribute Level Income across 12 levels
export const distributeLevelIncome = async (
  buyerId: string,
  packageName: string,
  settings: IncomeSettings
) => {
  // Get buyer info
  const { data: buyer } = await supabase
    .from('profiles')
    .select('sponsor_id, referred_by, full_name')
    .eq('user_id', buyerId)
    .single();

  if (!buyer?.sponsor_id && !buyer?.referred_by) {
    console.log('No sponsor found for level income');
    return;
  }

  let currentSponsorProfileId = buyer.sponsor_id || buyer.referred_by;
  
  for (let level = 1; level <= 12; level++) {
    if (!currentSponsorProfileId) break;

    // Get current sponsor details
    const { data: sponsor } = await supabase
      .from('profiles')
      .select('user_id, sponsor_id, referred_by, full_name')
      .eq('id', currentSponsorProfileId)
      .single();

    if (!sponsor) break;

    const levelKey = `level_${level}_income` as keyof IncomeSettings;
    const amount = settings[levelKey] as number;

    if (amount > 0) {
      await creditWallet(
        sponsor.user_id,
        amount,
        `Level ${level} Income - ${packageName} Package from ${buyer.full_name || 'User'}`,
        'level',
        level,
        buyerId
      );
      console.log(`Credited ₹${amount} level ${level} income to ${sponsor.full_name}`);
    }

    // Move to next upline
    currentSponsorProfileId = sponsor.sponsor_id || sponsor.referred_by;
  }
};

// Check and distribute Spillover Income milestones
export const checkSpilloverMilestones = async (
  sponsorUserId: string,
  packageName: string,
  settings: IncomeSettings
) => {
  // Get sponsor's profile with spillover count
  const { data: sponsor } = await supabase
    .from('profiles')
    .select('id, user_id, spillover_count, full_name')
    .eq('user_id', sponsorUserId)
    .single();

  if (!sponsor) return;

  const newCount = (sponsor.spillover_count || 0) + 1;

  // Update spillover count
  await supabase
    .from('profiles')
    .update({ spillover_count: newCount })
    .eq('id', sponsor.id);

  // Check milestones
  const milestones = [
    { count: 5, level: 1, amount: settings.spillover_level_1 },
    { count: 30, level: 2, amount: settings.spillover_level_2 },
    { count: 155, level: 3, amount: settings.spillover_level_3 },
    { count: 625, level: 4, amount: settings.spillover_level_4 }
  ];

  for (const milestone of milestones) {
    if (newCount === milestone.count && milestone.amount > 0) {
      await creditWallet(
        sponsor.user_id,
        milestone.amount,
        `Spillover Income - Level ${milestone.level} Complete (${milestone.count} members)`,
        'spillover',
        milestone.level
      );
      console.log(`Credited ₹${milestone.amount} spillover income to ${sponsor.full_name} for level ${milestone.level}`);
    }
  }
};

// Place user in Revenue Share Tree and check completions
export const processRevenueShareTree = async (
  userId: string,
  packageName: string,
  settings: IncomeSettings
) => {
  // Get user's sponsor
  const { data: user } = await supabase
    .from('profiles')
    .select('sponsor_id, referred_by')
    .eq('user_id', userId)
    .single();

  if (!user?.sponsor_id && !user?.referred_by) return;

  const sponsorProfileId = user.sponsor_id || user.referred_by;
  
  // Get sponsor's user_id
  const { data: sponsor } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('id', sponsorProfileId)
    .single();

  if (!sponsor) return;

  // Check if sponsor has a tree entry for this package
  const { data: sponsorTree } = await supabase
    .from('revenue_share_tree')
    .select('*')
    .eq('user_id', sponsor.user_id)
    .eq('package_type', packageName)
    .single();

  if (sponsorTree) {
    // Find empty position
    let position = null;
    if (!sponsorTree.left_pos) position = 'left_pos';
    else if (!sponsorTree.mid_pos) position = 'mid_pos';
    else if (!sponsorTree.right_pos) position = 'right_pos';

    if (position) {
      const newDownlineCount = sponsorTree.downline_count + 1;
      
      await supabase
        .from('revenue_share_tree')
        .update({
          [position]: userId,
          downline_count: newDownlineCount
        })
        .eq('id', sponsorTree.id);

      // Check if all 3 positions are filled
      if (position === 'right_pos') {
        // All positions filled, check for level completion rewards
        await checkRevenueShareLevelCompletion(sponsor.user_id, packageName, newDownlineCount, settings);
      }
    }
  } else {
    // Create new tree entry for sponsor
    await supabase
      .from('revenue_share_tree')
      .insert({
        user_id: sponsor.user_id,
        left_pos: userId,
        package_type: packageName,
        downline_count: 1
      });
  }

  // Create tree entry for the new user
  await supabase
    .from('revenue_share_tree')
    .insert({
      user_id: userId,
      package_type: packageName,
      downline_count: 0
    });
};

// Check Revenue Share level completion and credit income
const checkRevenueShareLevelCompletion = async (
  userId: string,
  packageName: string,
  downlineCount: number,
  settings: IncomeSettings
) => {
  const levelThresholds = [
    { count: 3, level: 1, key: 'revenue_share_level_1' },
    { count: 12, level: 2, key: 'revenue_share_level_2' },
    { count: 39, level: 3, key: 'revenue_share_level_3' },
    { count: 120, level: 4, key: 'revenue_share_level_4' },
    { count: 363, level: 5, key: 'revenue_share_level_5' },
    { count: 1092, level: 6, key: 'revenue_share_level_6' },
    { count: 3279, level: 7, key: 'revenue_share_level_7' },
    { count: 9840, level: 8, key: 'revenue_share_level_8' }
  ];

  for (const threshold of levelThresholds) {
    if (downlineCount === threshold.count) {
      const amount = settings[threshold.key as keyof IncomeSettings] as number;
      if (amount > 0) {
        await creditWallet(
          userId,
          amount,
          `Revenue Share Income - Level ${threshold.level} Complete`,
          'revenue_share',
          threshold.level
        );
        console.log(`Credited ₹${amount} revenue share income for level ${threshold.level}`);
      }
      break;
    }
  }
};

// Main function to distribute all incomes when package is approved
export const distributeAllIncomes = async (
  buyerId: string,
  packageName: string
) => {
  console.log(`Starting income distribution for ${buyerId} - ${packageName}`);

  // Get income settings for this package
  const settings = await getIncomeSettings(packageName);
  if (!settings) {
    console.error('Could not fetch income settings for', packageName);
    return false;
  }

  try {
    // 1. Distribute Referral Income
    await distributeReferralIncome(buyerId, packageName, settings);

    // 2. Distribute Level Income
    await distributeLevelIncome(buyerId, packageName, settings);

    // 3. Get sponsor for spillover check
    const { data: buyer } = await supabase
      .from('profiles')
      .select('sponsor_id, referred_by')
      .eq('user_id', buyerId)
      .single();

    if (buyer?.sponsor_id || buyer?.referred_by) {
      const sponsorProfileId = buyer.sponsor_id || buyer.referred_by;
      const { data: sponsor } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('id', sponsorProfileId)
        .single();

      if (sponsor) {
        // 3. Check Spillover Milestones
        await checkSpilloverMilestones(sponsor.user_id, packageName, settings);
      }
    }

    // 4. Process Revenue Share Tree
    await processRevenueShareTree(buyerId, packageName, settings);

    console.log('Income distribution completed successfully');
    return true;
  } catch (error) {
    console.error('Error in income distribution:', error);
    return false;
  }
};
