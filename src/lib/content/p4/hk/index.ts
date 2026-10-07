// HK Phase 4, weeks 31-40, one file per week. Imported in order so a card
// glossed in an earlier week can be re-presented later (see ../kit.ts).
import { assemble } from "../kit";
import { week as w31 } from "./w31";
import { week as w32 } from "./w32";
import { week as w33 } from "./w33";
import { week as w34 } from "./w34";
import { week as w35 } from "./w35";
import { week as w36 } from "./w36";
import { week as w37 } from "./w37";
import { week as w38 } from "./w38";
import { week as w39 } from "./w39";
import { week as w40 } from "./w40";

const HK_WEEKS = assemble({
  31: w31,
  32: w32,
  33: w33,
  34: w34,
  35: w35,
  36: w36,
  37: w37,
  38: w38,
  39: w39,
  40: w40,
});

export const HK_P4 = HK_WEEKS.lessons;
export const HK_P4_CAN_DO = HK_WEEKS.canDo;
export const HK_P4_TITLES = HK_WEEKS.titles;
