import { motion } from "framer-motion";

const CONTENT = {
  vocab: {
    blurb: "A curated glossary of five-star vocabulary — phrases that distinguish the merely correct from the unforgettable.",
    items: [
      ["Acknowledge", "Confirm a guest's presence within 10 seconds of approach."],
      ["Anticipate", "Predict the next need before it is voiced."],
      ["Recover", "Restore delight after an imperfect moment."],
      ["Bespoke", "Created for one guest, never to be repeated."],
      ["Discretion", "The art of unseen excellence."],
      ["Hospitality", "The generous reception of guests, strangers, or honoured friends."],
    ],
  },
  grammar: {
    blurb: "Polite forms, modal verbs, and the choreography of courteous English.",
    items: [
      ["May I…", "Replaces 'Can I' in all guest-facing requests."],
      ["Would you mind if…", "Softens any imposition on the guest."],
      ["I shall be delighted to…", "Confirms a future service with grace."],
      ["Allow me to…", "Volunteers assistance without imposition."],
      ["With your kind permission…", "Used before any deviation from request."],
      ["Regrettably…", "Replaces 'unfortunately' in apologies."],
    ],
  },
  reading: {
    blurb: "Executive briefings and SOP excerpts — the literature of luxury service.",
    items: [
      ["LQA Standard 4.3", "Eye contact, smile, and acknowledgement within 5 seconds of arrival at the desk."],
      ["Forbes 5-Star Service", "The service feels personalised, intuitive, and unhurried at every touchpoint."],
      ["GSS Audit Memo", "Every recovery must include an empathetic statement, an action, and a gesture."],
      ["VIP Pre-Arrival", "Confirm preferences 72h before arrival; communicate to all touchpoints."],
    ],
  },
} as const;

export function StaticSuite({ kind }: { kind: keyof typeof CONTENT }) {
  const c = CONTENT[kind];
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <p className="max-w-2xl text-sm text-foreground/75">{c.blurb}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {c.items.map(([term, body], i) => (
          <motion.div
            key={term}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="border-l-2 border-primary/40 bg-card p-5 shadow-xl"
          >
            <div className="font-display text-xl text-primary">{term}</div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{body}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
