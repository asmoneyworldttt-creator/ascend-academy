-- Add explicit DENY policies for public/anon access to sensitive tables
-- This ensures that even if other policies are bypassed, public users cannot access data

-- 1. Drop any existing public access policies on profiles (none exist, but safe to run)
-- Then add explicit deny for anon role on profiles
CREATE POLICY "Deny public access to profiles"
ON public.profiles
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- 2. Add explicit deny for anon role on bank_accounts
CREATE POLICY "Deny public access to bank_accounts"
ON public.bank_accounts
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- 3. Add explicit deny for anon role on wallet_history (for extra protection)
CREATE POLICY "Deny public access to wallet_history"
ON public.wallet_history
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- 4. Add explicit deny for anon role on agent_income
CREATE POLICY "Deny public access to agent_income"
ON public.agent_income
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- 5. Add explicit deny for anon role on payment_proofs
CREATE POLICY "Deny public access to payment_proofs"
ON public.payment_proofs
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- 6. Add explicit deny for anon role on withdrawal_requests
CREATE POLICY "Deny public access to withdrawal_requests"
ON public.withdrawal_requests
FOR ALL
TO anon
USING (false)
WITH CHECK (false);