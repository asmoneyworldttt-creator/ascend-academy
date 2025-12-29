import { useState } from "react";
import { Trophy, Medal, Award, Crown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AffiliateSidebar from "@/components/layout/AffiliateSidebar";

const leaderboardData = {
  allTime: [
    { rank: 1, name: "Vikram Sharma", avatar: "V", earnings: 250000, referrals: 150, badge: "Diamond" },
    { rank: 2, name: "Priya Patel", avatar: "P", earnings: 180000, referrals: 120, badge: "Platinum" },
    { rank: 3, name: "Rahul Kumar", avatar: "R", earnings: 145000, referrals: 95, badge: "Gold" },
    { rank: 4, name: "Ananya Singh", avatar: "A", earnings: 120000, referrals: 80, badge: "Gold" },
    { rank: 5, name: "Arjun Reddy", avatar: "A", earnings: 98000, referrals: 65, badge: "Silver" },
    { rank: 6, name: "Neha Gupta", avatar: "N", earnings: 85000, referrals: 55, badge: "Silver" },
    { rank: 7, name: "Karan Verma", avatar: "K", earnings: 72000, referrals: 48, badge: "Bronze" },
    { rank: 8, name: "Sneha Joshi", avatar: "S", earnings: 65000, referrals: 42, badge: "Bronze" },
    { rank: 9, name: "Rohit Mehra", avatar: "R", earnings: 58000, referrals: 38, badge: "Bronze" },
    { rank: 10, name: "Divya Rao", avatar: "D", earnings: 52000, referrals: 35, badge: "Bronze" },
  ],
  monthly: [
    { rank: 1, name: "Priya Patel", avatar: "P", earnings: 35000, referrals: 25, badge: "Gold" },
    { rank: 2, name: "Arjun Reddy", avatar: "A", earnings: 28000, referrals: 20, badge: "Silver" },
    { rank: 3, name: "Vikram Sharma", avatar: "V", earnings: 22000, referrals: 15, badge: "Silver" },
    { rank: 4, name: "Neha Gupta", avatar: "N", earnings: 18000, referrals: 12, badge: "Bronze" },
    { rank: 5, name: "Rahul Kumar", avatar: "R", earnings: 15000, referrals: 10, badge: "Bronze" },
  ],
  today: [
    { rank: 1, name: "Arjun Reddy", avatar: "A", earnings: 5000, referrals: 4, badge: "Gold" },
    { rank: 2, name: "Priya Patel", avatar: "P", earnings: 3500, referrals: 3, badge: "Silver" },
    { rank: 3, name: "Sneha Joshi", avatar: "S", earnings: 2000, referrals: 2, badge: "Bronze" },
  ],
};

const rankIcons: Record<number, { icon: any; color: string }> = {
  1: { icon: Crown, color: "text-yellow-500" },
  2: { icon: Medal, color: "text-gray-400" },
  3: { icon: Award, color: "text-amber-600" },
};

const LeaderboardPage = () => {
  const [period, setPeriod] = useState<"allTime" | "monthly" | "today">("allTime");
  const data = leaderboardData[period];

  // Current user's rank (mock)
  const myRank = { rank: 24, earnings: 45000, referrals: 15 };

  return (
    <AffiliateSidebar>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-card p-6 lg:p-8 rounded-3xl mb-6 bg-gradient-to-r from-primary/10 to-accent/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-gold opacity-10 rounded-full blur-3xl" />
          <div className="relative">
            <h1 className="text-2xl lg:text-3xl font-bold font-display mb-2 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-primary" />
              Leaderboard
            </h1>
            <p className="text-muted-foreground mb-4">Top performers ranked by earnings</p>
            
            {/* My Rank */}
            <div className="inline-flex items-center gap-4 p-3 bg-card/50 rounded-xl border border-border/50">
              <span className="text-sm text-muted-foreground">Your Rank:</span>
              <span className="text-xl font-bold text-primary">#{myRank.rank}</span>
              <span className="text-sm text-muted-foreground">|</span>
              <span className="text-sm">₹{myRank.earnings.toLocaleString()} earned</span>
            </div>
          </div>
        </div>

        {/* Period Tabs */}
        <div className="flex gap-2 mb-6">
          <Button 
            variant={period === "allTime" ? "hero" : "outline"} 
            size="sm"
            onClick={() => setPeriod("allTime")}
          >
            All Time
          </Button>
          <Button 
            variant={period === "monthly" ? "hero" : "outline"} 
            size="sm"
            onClick={() => setPeriod("monthly")}
          >
            This Month
          </Button>
          <Button 
            variant={period === "today" ? "hero" : "outline"} 
            size="sm"
            onClick={() => setPeriod("today")}
          >
            Today
          </Button>
        </div>

        {/* Top 3 Podium */}
        {data.length >= 3 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* 2nd Place */}
            <div className="glass-card p-4 rounded-2xl text-center order-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center mx-auto mb-3 ring-4 ring-gray-400/30">
                <span className="text-2xl font-bold text-white">{data[1].avatar}</span>
              </div>
              <Medal className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="font-bold text-sm truncate">{data[1].name}</p>
              <p className="text-lg font-bold text-gradient-gold">₹{data[1].earnings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{data[1].referrals} referrals</p>
            </div>

            {/* 1st Place */}
            <div className="glass-card p-5 rounded-2xl text-center order-0 md:order-1 ring-2 ring-yellow-500/50 bg-gradient-to-b from-yellow-500/10 to-transparent -mt-4">
              <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-3 ring-4 ring-yellow-500/30 shadow-lg shadow-yellow-500/20">
                <span className="text-3xl font-bold text-primary-foreground">{data[0].avatar}</span>
              </div>
              <p className="font-bold truncate">{data[0].name}</p>
              <p className="text-2xl font-bold text-gradient-gold">₹{data[0].earnings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{data[0].referrals} referrals</p>
            </div>

            {/* 3rd Place */}
            <div className="glass-card p-4 rounded-2xl text-center order-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center mx-auto mb-3 ring-4 ring-amber-600/30">
                <span className="text-2xl font-bold text-white">{data[2].avatar}</span>
              </div>
              <Award className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="font-bold text-sm truncate">{data[2].name}</p>
              <p className="text-lg font-bold text-gradient-gold">₹{data[2].earnings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{data[2].referrals} referrals</p>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-bold font-display">Full Rankings</h2>
          </div>
          <div className="divide-y divide-border/50">
            {data.map((user) => {
              const RankIcon = rankIcons[user.rank]?.icon;
              const rankColor = rankIcons[user.rank]?.color;
              
              return (
                <div key={user.rank} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      user.rank <= 3 ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      {RankIcon ? (
                        <RankIcon className={`w-5 h-5 ${rankColor}`} />
                      ) : (
                        <span className="font-bold text-sm text-muted-foreground">#{user.rank}</span>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                      <span className="font-bold text-primary-foreground">{user.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.referrals} referrals</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gradient-gold">₹{user.earnings.toLocaleString()}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.badge === 'Diamond' ? 'bg-cyan-500/10 text-cyan-500' :
                      user.badge === 'Platinum' ? 'bg-purple-500/10 text-purple-500' :
                      user.badge === 'Gold' ? 'bg-yellow-500/10 text-yellow-600' :
                      user.badge === 'Silver' ? 'bg-gray-500/10 text-gray-500' :
                      'bg-amber-600/10 text-amber-600'
                    }`}>
                      {user.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AffiliateSidebar>
  );
};

export default LeaderboardPage;
