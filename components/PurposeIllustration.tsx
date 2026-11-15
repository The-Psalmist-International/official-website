import { useId } from "react";

/** Layered object illustrations, following the Ovaal marketing artwork treatment. */
export default function PurposeIllustration({ kind }: { kind: "vision" | "mission" }) {
  const id = useId().replace(/:/g, "");
  return <svg aria-hidden="true" viewBox="0 0 420 300" fill="none" stroke="#9274a8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
    <defs>
      <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#eee5f6" /><stop offset=".45" stopColor="#dbc9e8" /><stop offset="1" stopColor="#b296c7" /></linearGradient>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#9f85b6" /><stop offset=".4" stopColor="#e4d6ef" /><stop offset=".65" stopColor="#c4acd7" /><stop offset="1" stopColor="#9b7bb2" /></linearGradient>
      <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#faf6fc" /><stop offset="1" stopColor="#dfcfe9" /></linearGradient>
      <radialGradient id={`${id}-glass`}><stop stopColor="#f8f4fb" /><stop offset=".65" stopColor="#d5c0e5" /><stop offset="1" stopColor="#a587ba" /></radialGradient>
    </defs>
    <circle cx="290" cy="215" r="156" fill="#dac7e8" fillOpacity=".3" stroke="none" />
    <ellipse cx="252" cy="280" rx="150" ry="12" fill="#9f85b6" fillOpacity=".14" stroke="none" />
    {kind === "vision" ? <>
      {/* Instrument mount and three tapered tripod legs. */}
      <path d="m228 157-66 119h12l63-105 9 105h11l-7-111 85 111h13l-98-127" fill={`url(#${id}-metal)`} />
      <path d="m230 174-28 70m48-55 49 63M246 181l2 63M173 268h9m63 0h12m69 0h12" strokeOpacity=".55" />
      <path d="m205 233 42 14 47-15M247 247v16" strokeOpacity=".6" />
      <path d="M223 126h31v32c0 15-31 15-31 0v-32Z" fill={`url(#${id}-metal)`} />
      <ellipse cx="239" cy="128" rx="16" ry="8" fill="#b89dcd" />
      <circle cx="251" cy="150" r="11" fill="#e4d6ef" /><circle cx="251" cy="150" r="4" fill="#ad8fc2" />
      <path d="m257 157 21 12" strokeWidth="4" /><ellipse cx="282" cy="172" rx="8" ry="5" transform="rotate(28 282 172)" fill="#b296c7" />
      {/* Telescope barrel in perspective, with collars, focus wheel, and lens. */}
      <g transform="rotate(-24 235 106)">
        <path d="M113 85h61v32h-61Z" fill={`url(#${id}-metal)`} />
        <ellipse cx="113" cy="101" rx="7" ry="16" fill="#a78abb" />
        <path d="M162 69h157v65H162c-18 0-18-65 0-65Z" fill={`url(#${id}-body)`} />
        <path d="M168 72c-14 5-14 55 0 59M181 70c-13 7-13 56 0 63M285 70c-12 7-12 56 0 63" strokeOpacity=".6" />
        <path d="M170 78h115M170 124h115" stroke="#f7f0fb" strokeWidth="2" strokeOpacity=".7" />
        <path d="M301 66h22v71h-22c-14-2-14-69 0-71Z" fill={`url(#${id}-metal)`} />
        <ellipse cx="324" cy="101.5" rx="17" ry="35.5" fill="#b397c9" />
        <ellipse cx="325" cy="101.5" rx="12" ry="29" fill={`url(#${id}-glass)`} />
        <path d="M326 80c-7 6-9 17-7 27" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
        <path d="M103 90h-9v22h9" fill="#c9b0dc" />
        <circle cx="166" cy="138" r="9" fill={`url(#${id}-metal)`} /><path d="M162 133v10m4-11v12m4-10v9" strokeOpacity=".5" />
      </g>
      <path d="M68 214h49m-39 7h28" strokeOpacity=".25" />
    </> : <>
      {/* A mounted terrestrial globe, with latitude and geographic detail. */}
      <path d="M282 186v55m-29 13c3-21 58-21 62 0l8 6h-78l8-6Z" fill={`url(#${id}-metal)`} />
      <path d="M227 47c-63 45-39 137 31 151 35 7 71-9 91-37" strokeWidth="5" stroke="#b497c9" />
      <g transform="rotate(-17 283 113)">
        <circle cx="283" cy="113" r="79" fill={`url(#${id}-body)`} />
        <ellipse cx="283" cy="113" rx="39" ry="79" strokeOpacity=".55" />
        <path d="M204 113h158M214 76c39 11 95 11 138 0M214 150c39-11 95-11 138 0M283 34v158" strokeOpacity=".45" />
        <path d="m239 52 18 5 8 15-7 12-16 2-3 15-12 7-17-9 6-23 11-5 12-19Zm-13 61 23 4 12 19-8 16-2 19-10 10-7-19-14-16 6-33Zm67-64 23 1 10 10-9 10 16 5 13 18-8 14-20-6-12 9-6 18-16-3-8-20 10-19-12-9 19-28Zm28 95 19 7 6 16-13 7-16-9 4-21Z" fill="#aa8abd" fillOpacity=".55" strokeWidth=".8" />
        <path d="M228 69c-14 15-19 37-15 54" stroke="#faf5ff" strokeWidth="3" strokeOpacity=".5" />
      </g>
      {/* Open Bible: layered page block, bowed sheets, stitching, and ribbon. */}
      <path d="m72 194 97-21 70 30 76 46-115 32-133-61 5-26Z" fill="#9f85b6" />
      <path d="m76 189 96-17 67 28 71 45-110 29-128-59 4-26Z" fill="#d1bcdf" />
      <path d="m82 177 89-18 66 33 65 44-102 28-122-55 4-32Z" fill={`url(#${id}-paper)`} />
      <path d="m82 177 89-18 29 105c-37-26-79-35-122-55l4-32Z" fill={`url(#${id}-paper)`} />
      <path d="M171 159c45 0 78 41 121 59l10 18-102 28-29-105Z" fill={`url(#${id}-paper)`} />
      <path d="m171 164 27 93M80 215l118 55 108-29M79 220l119 54 111-29" strokeOpacity=".45" />
      <path d="m97 184 36-7m-38 14 42-7m-43 14 47-7m-38 15 42-7m-22 16 27-5M197 179l34 16m-30-7 39 19m-35-9 45 20m-40-11 48 21m-43-12 37 16" strokeWidth="1" strokeOpacity=".45" />
      <path d="m182 203 9 4 30 72-11-3-5 8-23-81Z" fill="#b49ac9" strokeWidth=".8" />
    </>}
  </svg>;
}
