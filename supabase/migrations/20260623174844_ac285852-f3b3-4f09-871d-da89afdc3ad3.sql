
CREATE TABLE public.performance_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  fluency_score INTEGER NOT NULL DEFAULT 0,
  courtesy_score INTEGER NOT NULL DEFAULT 0,
  reflex_speed DOUBLE PRECISION NOT NULL DEFAULT 0,
  crisis_handling_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX performance_metrics_profile_id_idx ON public.performance_metrics(profile_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.performance_metrics TO authenticated;
GRANT ALL ON public.performance_metrics TO service_role;

ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own metrics"
  ON public.performance_metrics FOR SELECT
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own metrics"
  ON public.performance_metrics FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own metrics"
  ON public.performance_metrics FOR UPDATE
  TO authenticated
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own metrics"
  ON public.performance_metrics FOR DELETE
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE TRIGGER update_performance_metrics_updated_at
  BEFORE UPDATE ON public.performance_metrics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Realtime
ALTER TABLE public.performance_metrics REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.performance_metrics;
