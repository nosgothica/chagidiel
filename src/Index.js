const DEFAULT_VOICE_ID = '54YYBuRuAG6KJooiOhFI';
const MODEL_ID = 'eleven_multilingual_v2';
const OUTPUT_FORMAT = 'mp3_44100_128';
const ELEVEN_BASE = 'https://api.elevenlabs.io';
const AUDIO_PROFILE_VERSION = 'chagidiel-beta-1';
const VOICE_SETTINGS = { stability: 0.62, similarity_boost: 0.82, style: 0.0, use_speaker_boost: true, speed: 0.96 };

const FEATURED_VOICES = [
  { voice_id: DEFAULT_VOICE_ID, name: 'Alice - Soothing, Calm and Youthful', sangris_featured_rank: 0 },
  { voice_id: 'dEKbODj1fSHsx7xQNNLa', name: 'Grizzled Man - Raspy, Natural Narrator', sangris_featured_rank: 1 },
  { voice_id: 'CKfuQaJKfvUG2Wtrda3Y', name: 'Lison - Seductive and soft French accent', sangris_featured_rank: 2 },
  { voice_id: 'dTmTLshIypwp08eftJH6', name: 'Sylvie', sangris_featured_rank: 3 },
];

const MOVE_MAP = {
  act_under_pressure: { name: 'Act Under Pressure', attribute: 'reflexes' },
  endure_injury: { name: 'Endure Injury', attribute: 'fortitude' },
  keep_it_together: { name: 'Keep It Together', attribute: 'willpower' },
  engage_in_combat: { name: 'Engage in Combat', attribute: 'violence' },
  employ_stealth: { name: 'Employ Stealth', attribute: 'coolness' },
  influence_other: { name: 'Influence Other', attribute: 'charisma' },
  observe_situation: { name: 'Observe a Situation', attribute: 'perception' },
  read_person: { name: 'Read a Person', attribute: 'intuition' },
  see_through_illusion: { name: 'See Through the Illusion', attribute: 'soul' },
  investigate: { name: 'Investigate', attribute: 'reason' },
};

const OCCUPATIONS = {
  journalist: 'Freelance Journalist',
  writer: 'Horror Writer',
  bookseller: 'Rare Book Dealer',
  kgb: 'Defected KGB Operative',
  agent: 'Literary Agent',
};

const MAGDA_RELATIONS = {
  journalism: 'Knows Magda through her journalism',
  bookstore: 'Knew Magda through her antique bookstore',
  friend: 'Friend of a friend',
  helped: 'Magda helped you through a bad time',
  lover: 'Former lover',
  literary: 'Literary circles in Berlin and Hamburg',
  child: 'Child of Magda Orlova',
};

const FREE_ROAM_LOCATIONS = {
  hamburg_apartment: {
    name: "Magda's Hamburg Apartment",
    art: '/media/art/maps/ch01_magda_hamburg_apartment_map.png',
    frame: 'dossier',
    actions: {
      search: { label: 'Search the apartment carefully', move: 'investigate', clue: 'hamburg_letter',
        prose: 'The apartment has the stillness of a place abandoned too quickly. Old paper, perfume, and dust linger in the rooms. In a stack of correspondence you find a recent letter from Arnold Weiss in Berlin, along with material pointing toward Magda\'s old contacts.' },
      observe: { label: 'Look for what does not belong', move: 'observe_situation', clue: 'hamburg_key',
        prose: 'The obvious things tell you less than the small ones. A spare key has been hidden with the care of someone who expected to return. The address attached to it is in Berlin.' },
    },
  },
  berlin_apartment: {
    name: "Magda's Berlin Apartment",
    art: '/media/art/scenes/ch01_magda_berlin_apartment_exterior.webp',
    frame: 'story',
    actions: {
      search: { label: 'Search Magda\'s Berlin rooms', move: 'investigate', clue: 'berlin_association',
        prose: 'The rooms are colder than they should be. Among notebooks and old address material, one name repeats with enough frequency to matter: the Slavic Association. The three Russians appear in the same orbit.' },
      dreams: { label: 'Study her notes about the nightmares', move: 'investigate', clue: 'dream_notes',
        prose: 'The notes deteriorate as the dates advance. Sleep becomes an enemy. Names, fragments of ritual language, and repeated references to punishment crowd the later pages.' },
    },
  },
  records: {
    name: 'National Registration Office',
    art: '/media/art/scenes/ch01_medical_police_research_collage.webp',
    frame: 'story',
    actions: {
      persuade: { label: 'Talk your way into the older files', move: 'influence_other', clue: 'mahler_records',
        prose: 'Reunification has reached the flags outside. It has not reached the basement. The clerk eventually lets you see enough of the paper trail to notice that Anton Mahler\'s history is less clean than his official identity suggests.' },
      stealth: { label: 'Wait for an opening and inspect the files yourself', move: 'employ_stealth', clue: 'mahler_records',
        prose: 'The old registry is physical, badly supervised, and easy to underestimate. You find Mahler\'s name where you expected it, and inconsistencies where you did not.' },
    },
  },
  mantra: {
    name: 'Mantra',
    art: '/media/art/scenes/ch01_medical_police_research_collage.webp',
    frame: 'story',
    actions: {
      question: { label: 'Ask Erica Holler about Magda and the Russians', move: 'read_person', clue: 'mantra_dreams',
        prose: 'Erica does not react to the names equally. Magda earns concern. The Russians earn caution. She points you toward material on dream magic and a ritual tradition used to turn a curse back toward its source.' },
      research: { label: 'Research dream magic and cursed diseases', move: 'investigate', clue: 'curse_ritual',
        prose: 'The books are the kind that make ordinary superstition look tidy. Buried among them is a ritual logic that fits Magda\'s notes too well: suffering can be redirected toward those believed responsible for it.' },
    },
  },
  slavic: {
    name: 'Slavic Association',
    art: '/media/art/scenes/ch01_slavic_association_surveillance_collage.webp',
    frame: 'story',
    actions: {
      surveil: { label: 'Watch the building and learn its rhythm', move: 'observe_situation', clue: 'slavic_schedule',
        prose: 'The public face is cultural, almost dull. The pattern after dark is different. Anton appears regularly, and certain late meetings draw people who do not behave like members of an ordinary civic association.' },
      infiltrate: { label: 'Get inside without announcing yourself', move: 'employ_stealth', clue: 'pogodin_meeting',
        prose: 'The Association keeps more than newsletters. A calendar entry and internal notes point toward a private gathering at Sasha Pogodin\'s mansion. The timing is soon.' },
    },
  },
};

const CLUES = {
  hamburg_letter: { title: 'Letter from Arnold Weiss', text: 'A recent personal letter connects Magda to Arnold Weiss in Berlin.' },
  hamburg_key: { title: 'Spare Berlin Key', text: 'A hidden spare key points to Magda\'s Berlin residence.' },
  berlin_association: { title: 'Slavic Association', text: 'Magda\'s notes and addresses connect her to the Slavic Association and the three Russians.' },
  dream_notes: { title: 'Magda\'s Nightmare Notes', text: 'Her notes describe worsening nightmares, ritual fragments, and fear of punishment.' },
  mahler_records: { title: 'Mahler Registration Inconsistencies', text: 'Anton Mahler\'s official records contain inconsistencies worth pursuing.' },
  mantra_dreams: { title: 'Dream-Magic Lead', text: 'Erica Holler points toward dream magic and the occult reputation surrounding Magda\'s Russian acquaintances.' },
  curse_ritual: { title: 'Curse-Reversal Ritual', text: 'A ritual tradition may redirect a cursed disease toward those believed responsible.' },
  slavic_schedule: { title: 'Slavic Association Schedule', text: 'Anton appears regularly; the Association hosts late meetings that do not match its public cultural role.' },
  pogodin_meeting: { title: 'Meeting at Pogodin\'s Mansion', text: 'Internal material points to an imminent private gathering at Sasha Pogodin\'s estate.' },
};

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...headers } });
}

function randId(prefix = '') {
  const b = new Uint8Array(12);
  crypto.getRandomValues(b);
  return prefix + [...b].map(x => x.toString(16).padStart(2, '0')).join('');
}
function randomCode() { return String(100000 + Math.floor(Math.random() * 900000)); }
function base64url(bytes) {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
function unbase64url(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const raw = atob(s); return Uint8Array.from(raw, c => c.charCodeAt(0));
}
async function sha(text) { return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))); }
async function hmac(secret, text) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(text)));
}
async function signSession(env, payload) {
  if (!env.AUTH_SECRET) throw new Error('AUTH_SECRET is not configured.');
  const body = base64url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = base64url(await hmac(env.AUTH_SECRET, body));
  return `${body}.${sig}`;
}
async function verifySession(env, token) {
  if (!token || !env.AUTH_SECRET) return null;
  const [body, sig] = String(token).split('.');
  if (!body || !sig) return null;
  const expected = base64url(await hmac(env.AUTH_SECRET, body));
  if (expected !== sig) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(unbase64url(body)));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch (_) { return null; }
}
function bearer(request, url) {
  const h = request.headers.get('authorization') || '';
  if (/^Bearer\s+/i.test(h)) return h.replace(/^Bearer\s+/i, '').trim();
  return url.searchParams.get('token') || '';
}
function normalizeContact(method, value) {
  const raw = String(value || '').trim();
  if (method === 'email') return raw.toLowerCase();
  return raw.replace(/[^0-9+]/g, '');
}
async function userIdFor(method, contact) {
  const digest = await sha(`${method}:${contact}`);
  return 'u_' + base64url(digest.slice(0, 12));
}

async function sendEmail(env, to, code, purpose = 'login') {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) return false;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: env.RESEND_FROM, to: [to], subject: purpose === 'login' ? 'Your Chagidiel login code' : 'Chagidiel - your protagonist is needed', html: purpose === 'login' ? `<p>Your Chagidiel code is <strong>${code}</strong>.</p>` : `<p>${code}</p>` }),
  });
  return r.ok;
}
async function sendSms(env, to, body) {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_FROM) return false;
  const form = new URLSearchParams({ To: to, From: env.TWILIO_FROM, Body: body });
  const auth = btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(env.TWILIO_ACCOUNT_SID)}/Messages.json`, { method: 'POST', headers: { authorization: `Basic ${auth}`, 'content-type': 'application/x-www-form-urlencoded' }, body: form });
  return r.ok;
}

function outcome(total) { return total >= 15 ? 'complete' : total >= 10 ? 'complication' : 'failure'; }
function roll2d10(modifier = 0) {
  const b = new Uint32Array(2); crypto.getRandomValues(b);
  const dice = [1 + (b[0] % 10), 1 + (b[1] % 10)];
  const total = dice[0] + dice[1] + Number(modifier || 0);
  return { dice, modifier: Number(modifier || 0), total, outcome: outcome(total) };
}
function attrValue(character, attr) {
  const n = Number(character?.attributes?.[attr] ?? 0);
  return Number.isFinite(n) ? Math.max(-5, Math.min(5, n)) : 0;
}
function rollFor(character, moveKey, extra = 0) {
  const move = MOVE_MAP[moveKey];
  if (!move) return null;
  const modifier = attrValue(character, move.attribute) + Number(extra || 0);
  return { move: move.name, attribute: move.attribute, ...roll2d10(modifier) };
}

function newCampaign(id, invite, creator) {
  return {
    version: 1,
    id,
    invite,
    createdAt: Date.now(),
    revision: 1,
    phase: 'lobby',
    players: {
      A: { uid: creator.uid, contact: creator.contact, method: creator.method, character: null, lastSeen: Date.now(), prefs: { storyAlerts: true, evidenceAlerts: true } },
      B: null,
    },
    current: { mode: 'lobby', scene: 'setup', beat: 0 },
    storyLock: { gate: null, active: false, ready: { A: false, B: false }, actions: {}, lastResolution: null },
    freeRoam: { day: '17 September 1991', slots: { A: [null, null, null], B: [null, null, null] }, lastResult: { A: null, B: null } },
    journal: { shared: [], private: { A: [], B: [] } },
    flags: { goldPlaqueDone: false, ambushDone: false, pogodinAvailable: false, betaComplete: false, marked: { A: false, B: false }, infection: { A: false, B: false } },
    log: [],
  };
}
function seatFor(c, uid) {
  if (c.players.A?.uid === uid) return 'A';
  if (c.players.B?.uid === uid) return 'B';
  return null;
}
function otherSeat(seat) { return seat === 'A' ? 'B' : 'A'; }
function cleanCharacter(input) {
  const attrs = {};
  const keys = ['fortitude','willpower','reflexes','reason','intuition','perception','coolness','violence','charisma','soul'];
  for (const k of keys) attrs[k] = Math.max(-2, Math.min(3, Number(input?.attributes?.[k] ?? 0) || 0));
  return {
    name: String(input?.name || 'Unnamed').slice(0, 80),
    occupation: OCCUPATIONS[input?.occupation] ? input.occupation : 'journalist',
    relation: MAGDA_RELATIONS[input?.relation] ? input.relation : 'friend',
    attributes: attrs,
    stability: String(input?.stability || 'Composed'),
    wounds: [],
  };
}
function pushLog(c, type, seat, detail = {}) {
  c.log.push({ id: randId('e_'), at: Date.now(), type, seat, detail });
  if (c.log.length > 120) c.log = c.log.slice(-120);
}
function addPrivateClue(c, seat, clueId, source) {
  if (!CLUES[clueId]) return;
  if (!c.journal.private[seat].some(x => x.clueId === clueId)) c.journal.private[seat].push({ clueId, source, at: Date.now() });
}
function sharedClueCount(c) { return c.journal.shared.length; }
function spentCount(c, seat) { return c.freeRoam.slots[seat].filter(Boolean).length; }
function nextSlot(c, seat) { return c.freeRoam.slots[seat].findIndex(x => !x); }
function storyGate(c, scene, forced = false) {
  c.current = { mode: 'story_gate', scene, beat: 0 };
  c.storyLock = { gate: { scene, forced, acknowledged: { A: false, B: false } }, active: false, ready: { A: false, B: false }, actions: {}, lastResolution: null };
}
function activateStory(c, scene) {
  c.current = { mode: 'story_lock', scene, beat: 0 };
  c.storyLock.active = true;
  c.storyLock.gate = null;
  c.storyLock.actions = {};
  c.storyLock.lastResolution = null;
}
function finishStory(c, nextMode = 'free_roam') {
  c.storyLock.active = false;
  c.storyLock.actions = {};
  c.storyLock.ready = { A: false, B: false };
  c.storyLock.gate = null;
  if (nextMode === 'free_roam') c.current = { mode: 'free_roam', scene: 'berlin_free_roam', beat: 0 };
}

function sharedStoryText(c) {
  const s = c.current.scene, b = c.current.beat;
  if (s === 'gold_plaque') {
    if (b === 0) return { kicker: 'Hamburg - 14 September 1991', title: 'The Gold Plaque', text: ['Rain makes the Rathaus windows shine like black mirrors. Inside, publishers, writers, minor celebrities, and people who want to be mistaken for all three move beneath chandeliers and vaulted ceilings.', 'For a few hours the evening is almost reassuringly ordinary. That is the first cruelty of it.'], art: null };
    if (b === 1) return { kicker: 'Near Midnight', title: 'Late Arrivals', text: ['Four people enter late. You recognize Magda first. The three men with her are slower to place.', 'They see you. Whatever conversation they were having ends. One reaches for his glass and misses it the first time. Another has gone visibly pale.'], art: null };
    return { kicker: 'The Dance', title: 'Magda', text: ['Up close, Magda looks older than memory permits. Her perfume is too strong. Her hands tremble when she removes her gloves.', 'She talks about Berlin, sleeplessness, and dreams she cannot hold onto after waking. She touches each of you with the unconscious insistence of someone afraid of being left alone.'], art: null };
  }
  if (s === 'ambush') {
    if (b === 0) return { kicker: 'Berlin - Free Roam Interrupted', title: 'The Dodge Van', text: ['The metallic Dodge has been in the wrong place too many times to be coincidence.', 'Its side door opens. The men inside do not look surprised to see you looking back.'], art: '/media/art/scenes/ch01_medical_police_research_collage.webp' };
    return { kicker: 'Story Lock - Combat Beat', title: 'No Clean Exit', text: ['The street compresses into cover, sightlines, engines, wet pavement, and the hard fact that somebody planned this.', 'Whatever you do next, do it together or accept what separation will cost.'], art: '/media/art/scenes/ch01_medical_police_research_collage.webp' };
  }
  if (s === 'pogodin') {
    if (b === 0) return { kicker: 'South of Berlin', title: "Pogodin's Mansion", text: ['The estate is set back from the road and built to discourage curiosity. Security lights rake the grounds. Dogs move somewhere beyond the wall.', 'You know enough now to understand that tonight matters. You do not yet know to whom.'], art: '/media/art/scenes/ch01_pogodin_mansion_collage.webp' };
    if (b === 1) return { kicker: 'Inside the Estate', title: 'The Inner Circle', text: ['The public rooms are expensive and controlled. Below them is something else: soundproofed doors, ritual geometry, and people whose suffering has been turned into an instrument.', 'The three Russians are here. So is the ritual you believe can send the curse back to them.'], art: '/media/art/scenes/ch01_pogodin_ritual_collage.webp' };
    return { kicker: 'Point of No Return', title: 'The Third Circle', text: ['The final circle must be drawn around Anton, Sasha, and Filip themselves.', 'The words are ready. The geometry is ready. The only uncertain thing left is whether you are.'], art: '/media/art/scenes/ch01_pogodin_ritual_collage.webp' };
  }
  return { kicker: 'Chagidiel', title: 'Waiting', text: ['The story has not yet decided what it wants from you.'], art: null };
}
function lockChoices(c, seat) {
  const s = c.current.scene, b = c.current.beat;
  if (s === 'gold_plaque' && b === 0) return [
    { id: 'mingle', label: 'Mingle and read the room', move: 'observe_situation' },
    { id: 'stay_together', label: 'Stay close to your partner', move: null },
    { id: 'work_room', label: 'Use your professional contacts', move: 'influence_other' },
    { id: 'watch_exits', label: 'Watch the entrances and exits', move: 'observe_situation' },
  ];
  if (s === 'gold_plaque' && b === 1) return [
    { id: 'approach_magda', label: 'Go directly to Magda', move: null },
    { id: 'watch_russians', label: 'Watch the three men instead', move: 'observe_situation' },
    { id: 'identify_filip', label: 'Try to place the exhausted-looking man', move: 'investigate' },
    { id: 'hang_back', label: 'Keep your distance and let them reveal themselves', move: 'read_person' },
  ];
  if (s === 'gold_plaque' && b === 2) return [
    { id: 'ask_nightmares', label: 'Ask Magda about the nightmares', move: 'read_person' },
    { id: 'reassure', label: 'Reassure her and stay close', move: 'influence_other' },
    { id: 'press', label: 'Press her for names and details', move: 'influence_other' },
    { id: 'follow_russians', label: 'Track where the Russians went', move: 'employ_stealth' },
  ];
  if (s === 'ambush') return b === 0 ? [
    { id: 'cover', label: 'Get to cover and assess the threat', move: 'act_under_pressure' },
    { id: 'protect', label: 'Protect your partner', move: 'act_under_pressure' },
    { id: 'observe', label: 'Find the shooter and the cleanest exit', move: 'observe_situation' },
    { id: 'return_fire', label: 'Return fire', move: 'engage_in_combat' },
    { id: 'rush_van', label: 'Rush the van before they can reposition', move: 'act_under_pressure' },
  ] : [
    { id: 'escape', label: 'Break contact and escape together', move: 'act_under_pressure' },
    { id: 'suppress', label: 'Keep them pinned while your partner moves', move: 'engage_in_combat' },
    { id: 'disable_van', label: 'Disable the van', move: 'improvised', attribute: 'reason' },
    { id: 'take_prisoner', label: 'Try to take one attacker alive', move: 'engage_in_combat' },
  ];
  if (s === 'pogodin' && b === 0) return [
    { id: 'surveil', label: 'Watch the grounds before moving', move: 'observe_situation' },
    { id: 'sneak', label: 'Enter quietly through the estate', move: 'employ_stealth' },
    { id: 'bluff', label: 'Approach openly with a cover story', move: 'influence_other' },
    { id: 'wait', label: 'Wait for the Inner Circle to settle in', move: null },
  ];
  if (s === 'pogodin' && b === 1) return [
    { id: 'rescue', label: 'Find and help the prisoners', move: 'act_under_pressure' },
    { id: 'temple', label: 'Push toward the temple', move: 'employ_stealth' },
    { id: 'chaos', label: 'Create a diversion upstairs', move: 'improvised', attribute: 'coolness' },
    { id: 'police', label: 'Try to bring the police down on the estate', move: 'influence_other' },
  ];
  if (s === 'pogodin' && b === 2) return [
    { id: 'perform_ritual', label: 'Complete the ritual around the Russians', move: 'keep_it_together' },
    { id: 'rescue_first', label: 'Refuse to leave the prisoners behind', move: 'act_under_pressure' },
    { id: 'destroy', label: 'Destroy the ritual space instead', move: 'improvised', attribute: 'reason' },
    { id: 'withdraw', label: 'Withdraw before you understand too late', move: 'act_under_pressure' },
  ];
  return [];
}
function resolveJoint(c, actions) {
  const s = c.current.scene, b = c.current.beat;
  const a = actions.A?.id, d = actions.B?.id;
  let text = [];
  if (s === 'gold_plaque') {
    if (b === 0) text = a === d ? ['You fall into the same rhythm without discussing it. The room gives up details slowly: who belongs, who is performing belonging, who watches instead of drinking.'] : ['You divide your attention. One of you works the room while the other watches its edges. Between you, the evening feels mapped rather than merely attended.'];
    if (b === 1) text = (a === 'watch_russians' || d === 'watch_russians') ? ['The Russians are not merely uncomfortable. They are frightened of you, and trying badly not to show it. Magda notices their reaction and becomes frightened in turn.'] : ['Magda receives you with warmth strained by exhaustion. Behind her, the three men exchange a quick, private look and leave sooner than courtesy requires.'];
    if (b === 2) text = ['Magda talks until the subject begins circling back on itself: Berlin, sleeplessness, the same nightmares, the feeling that something is waiting for her when she closes her eyes.', 'When you part, the evening feels unresolved. By the following night, both of you are ill.'];
  } else if (s === 'ambush') {
    if (b === 0) text = (a === 'protect' || d === 'protect') ? ['One of you moves toward the other instead of toward safety. It costs distance and buys something more important: neither of you is isolated when the first shots force the street apart.'] : ['You react differently but not independently. One action creates the opening the other needs. The men by the van lose the clean advantage they expected.'];
    else text = ['The encounter breaks before it becomes a siege. The Dodge tears away through wet traffic, leaving brass, tire smoke, and the certainty that whoever sent those men knows where you are.'];
  } else if (s === 'pogodin') {
    if (b === 0) text = ['You choose your approach and commit. Security is professional, but routine has made it predictable. The mansion gives you a way in, though not a safe one.'];
    if (b === 1) text = (a === 'rescue' || d === 'rescue') ? ['The people below are alive, barely. Helping them costs time and makes silence harder, but leaving them would mean accepting what this place was built to do.'] : ['You move through the house while the ritual below absorbs everyone\'s attention. The closer you get, the less the mansion feels like a home.'];
    if (b === 2) {
      const performers = ['A','B'].filter(x => actions[x]?.id === 'perform_ritual');
      if (performers.length) {
        for (const seat of performers) c.flags.marked[seat] = true;
        text = ['The final words do not send the curse back the way you expected. The room opens onto something larger and colder than the basement beneath it.', 'Three shapes approach from beyond the ruined geometry. When the ordeal ends, the Russians are gone and something has touched the ones who completed the rite. You have not been cured. You have been noticed.'];
      } else {
        text = ['You refuse the ritual\'s promised answer. The choice saves you from one certainty and leaves every other problem intact. Somewhere beyond the walls, the three Russians are already moving.'];
      }
    }
  }
  return text;
}
function publicView(c, uid, online = {}) {
  const seat = seatFor(c, uid);
  if (!seat) return null;
  const other = otherSeat(seat);
  const own = c.players[seat];
  const partner = c.players[other];
  const base = {
    id: c.id, revision: c.revision, phase: c.phase, seat,
    player: { character: own?.character || null },
    partner: partner ? { character: partner.character ? { name: partner.character.name, occupation: partner.character.occupation } : null, online: !!online[other], lastSeen: partner.lastSeen || null } : null,
    current: c.current,
    flags: { ...c.flags, marked: { self: !!c.flags.marked[seat], partnerKnown: false }, infection: { self: !!c.flags.infection[seat] } },
    storyLock: { active: c.storyLock.active, gate: c.storyLock.gate, ready: c.storyLock.ready, submitted: !!c.storyLock.actions?.[seat], partnerSubmitted: !!c.storyLock.actions?.[other], lastResolution: c.storyLock.lastResolution },
    freeRoam: { day: c.freeRoam.day, slots: c.freeRoam.slots[seat], partnerSlotsUsed: spentCount(c, other), lastResult: c.freeRoam.lastResult[seat], locations: Object.fromEntries(Object.entries(FREE_ROAM_LOCATIONS).map(([id, x]) => [id, { name: x.name, art: x.art, frame: x.frame, actions: Object.fromEntries(Object.entries(x.actions).map(([aid,a]) => [aid,{ label:a.label, move:a.move, attribute:a.attribute || (MOVE_MAP[a.move]?.attribute || null) }])) }])) },
    journal: { shared: c.journal.shared.map(x => ({ ...x, clue: CLUES[x.clueId] })), private: c.journal.private[seat].map(x => ({ ...x, clue: CLUES[x.clueId] })) },
    betaComplete: c.flags.betaComplete,
  };
  if (c.current.mode === 'story_lock') {
    base.story = sharedStoryText(c);
    base.choices = lockChoices(c, seat);
  }
  return base;
}

async function safeNotify(env, player, message) {
  if (!player?.contact) return false;
  if (player.method === 'sms') return sendSms(env, player.contact, `Chagidiel: ${message}`);
  if (player.method === 'email') return sendEmail(env, player.contact, message, 'alert');
  return false;
}

export class AuthRoom {
  constructor(state, env) { this.state = state; this.env = env; }
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/request') {
      const body = await request.json();
      const method = body.method === 'sms' ? 'sms' : 'email';
      const contact = normalizeContact(method, body.value);
      if (!contact || (method === 'email' && !contact.includes('@')) || (method === 'sms' && contact.length < 8)) return json({ error: 'Enter a valid email address or phone number.' }, 400);
      const code = randomCode();
      const hash = base64url(await sha(code));
      await this.state.storage.put(`otp:${method}:${contact}`, { hash, exp: Date.now() + 10 * 60 * 1000, attempts: 0 });
      let sent = false;
      if (method === 'sms') sent = await sendSms(this.env, contact, `Your Chagidiel login code is ${code}. It expires in 10 minutes.`);
      else sent = await sendEmail(this.env, contact, code, 'login');
      const out = { ok: true, sent };
      if (!sent && String(this.env.DEV_OTP || '').toLowerCase() === 'true') out.devCode = code;
      if (!sent && !out.devCode) out.warning = 'No email/SMS provider is configured on this Worker.';
      return json(out);
    }
    if (url.pathname === '/verify') {
      const body = await request.json();
      const method = body.method === 'sms' ? 'sms' : 'email';
      const contact = normalizeContact(method, body.value);
      const key = `otp:${method}:${contact}`;
      const rec = await this.state.storage.get(key);
      if (!rec || rec.exp < Date.now()) return json({ error: 'That code has expired.' }, 400);
      if (rec.attempts >= 6) return json({ error: 'Too many attempts. Request another code.' }, 429);
      const hash = base64url(await sha(String(body.code || '').trim()));
      if (hash !== rec.hash) { rec.attempts++; await this.state.storage.put(key, rec); return json({ error: 'Incorrect code.' }, 400); }
      await this.state.storage.delete(key);
      const uid = await userIdFor(method, contact);
      const token = await signSession(this.env, { uid, contact, method, exp: Date.now() + 30 * 24 * 60 * 60 * 1000 });
      return json({ ok: true, token, user: { uid, contact, method } });
    }
    return json({ error: 'Not found.' }, 404);
  }
}

export class CampaignRoom {
  constructor(state, env) {
    this.state = state; this.env = env; this.sockets = new Map();
  }
  async load() { return await this.state.storage.get('campaign'); }
  async save(c) { c.revision = Number(c.revision || 0) + 1; await this.state.storage.put('campaign', c); return c; }
  presence() {
    const out = { A: false, B: false };
    for (const [seat, set] of this.sockets) out[seat] = set.size > 0;
    return out;
  }
  broadcast(c) {
    const online = this.presence();
    for (const [seat, set] of this.sockets) {
      const uid = c.players[seat]?.uid;
      if (!uid) continue;
      const payload = JSON.stringify({ type: 'state', state: publicView(c, uid, online) });
      for (const ws of set) { try { ws.send(payload); } catch (_) {} }
    }
  }
  async fetch(request) {
    const url = new URL(request.url);
    const uid = request.headers.get('x-chagidiel-user');
    const contact = request.headers.get('x-chagidiel-contact');
    const method = request.headers.get('x-chagidiel-method');
    if (url.pathname === '/init') {
      let c = await this.load();
      if (!c) { const b = await request.json(); c = newCampaign(b.id, b.invite, { uid, contact, method }); await this.state.storage.put('campaign', c); }
      return json({ ok: true, state: publicView(c, uid, this.presence()), invite: c.invite });
    }
    let c = await this.load();
    if (!c) return json({ error: 'Campaign does not exist.' }, 404);
    if (url.pathname === '/join') {
      const b = await request.json();
      let seat = seatFor(c, uid);
      if (!seat) {
        if (c.players.B) return json({ error: 'Campaign already has two players.' }, 409);
        if (String(b.invite || '') !== String(c.invite || '')) return json({ error: 'Invalid invite code.' }, 403);
        c.players.B = { uid, contact, method, character: null, lastSeen: Date.now(), prefs: { storyAlerts: true, evidenceAlerts: true } };
        c.invite = null; seat = 'B'; pushLog(c, 'player_joined', seat); await this.save(c);
      }
      this.broadcast(c); return json({ ok: true, seat, state: publicView(c, uid, this.presence()) });
    }
    const seat = seatFor(c, uid);
    if (!seat) return json({ error: 'You are not a member of this campaign.' }, 403);
    c.players[seat].lastSeen = Date.now();
    if (url.pathname === '/state') return json({ ok: true, state: publicView(c, uid, this.presence()) });
    if (url.pathname === '/ws') {
      if (request.headers.get('upgrade') !== 'websocket') return json({ error: 'WebSocket required.' }, 426);
      const pair = new WebSocketPair(); const client = pair[0], server = pair[1]; server.accept();
      if (!this.sockets.has(seat)) this.sockets.set(seat, new Set()); this.sockets.get(seat).add(server);
      server.addEventListener('close', async () => { this.sockets.get(seat)?.delete(server); const fresh = await this.load(); if (fresh) this.broadcast(fresh); });
      server.addEventListener('error', () => this.sockets.get(seat)?.delete(server));
      server.send(JSON.stringify({ type: 'state', state: publicView(c, uid, this.presence()) })); this.broadcast(c);
      return new Response(null, { status: 101, webSocket: client });
    }
    if (url.pathname === '/action') {
      const b = await request.json();
      const other = otherSeat(seat);
      if (b.type === 'set_character') {
        c.players[seat].character = cleanCharacter(b.character); pushLog(c, 'character_set', seat);
        if (c.players.A?.character && c.players.B?.character && c.current.mode === 'lobby') { storyGate(c, 'gold_plaque', false); c.phase = 'chapter1'; }
      } else if (b.type === 'story_gate_ready') {
        if (c.current.mode !== 'story_gate') return json({ error: 'No Story Lock gate is active.' }, 409);
        if (c.storyLock.gate?.forced) c.storyLock.gate.acknowledged[seat] = true; else c.storyLock.ready[seat] = true;
        pushLog(c, 'story_gate_ready', seat, { scene: c.current.scene });
        const both = c.storyLock.gate?.forced ? (c.storyLock.gate.acknowledged.A && c.storyLock.gate.acknowledged.B) : (c.storyLock.ready.A && c.storyLock.ready.B);
        if (both) activateStory(c, c.current.scene);
        else if (!this.presence()[other]) await safeNotify(this.env, c.players[other], 'A Story Lock is waiting for your protagonist.');
      } else if (b.type === 'story_gate_cancel') {
        if (c.current.mode === 'story_gate' && !c.storyLock.gate?.forced) c.storyLock.ready[seat] = false;
      } else if (b.type === 'lock_action') {
        if (c.current.mode !== 'story_lock') return json({ error: 'Story Lock is not active.' }, 409);
        if (c.storyLock.actions[seat]) return json({ error: 'Your action is already locked.' }, 409);
        const allowed = lockChoices(c, seat); const selected = allowed.find(x => x.id === b.actionId);
        if (!selected) return json({ error: 'That action is not available.' }, 400);
        let roll = null;
        if (selected.move === 'improvised') {
          const modifier = attrValue(c.players[seat].character, selected.attribute);
          roll = { move: 'Improvised Move', attribute: selected.attribute, ...roll2d10(modifier) };
        } else if (selected.move) roll = rollFor(c.players[seat].character, selected.move);
        c.storyLock.actions[seat] = { id: selected.id, label: selected.label, move: selected.move || null, roll };
        pushLog(c, 'joint_action_submitted', seat, { scene: c.current.scene, beat: c.current.beat, action: selected.id, roll });
        if (c.storyLock.actions.A && c.storyLock.actions.B) {
          const resolution = resolveJoint(c, c.storyLock.actions);
          const rolls = { A: c.storyLock.actions.A.roll, B: c.storyLock.actions.B.roll };
          if (c.current.scene === 'ambush') {
            for (const st of ['A','B']) if (rolls[st]?.outcome === 'failure' && !c.players[st].character.wounds.includes('Serious Wound')) c.players[st].character.wounds.push('Serious Wound');
          }
          c.storyLock.lastResolution = { text: resolution, actions: { A: c.storyLock.actions.A, B: c.storyLock.actions.B }, at: Date.now() };
          const scene = c.current.scene, beat = c.current.beat;
          c.storyLock.actions = {};
          if (scene === 'gold_plaque' && beat < 2) c.current.beat++;
          else if (scene === 'gold_plaque') { c.flags.goldPlaqueDone = true; c.flags.infection.A = true; c.flags.infection.B = true; finishStory(c); }
          else if (scene === 'ambush' && beat < 1) c.current.beat++;
          else if (scene === 'ambush') { c.flags.ambushDone = true; finishStory(c); }
          else if (scene === 'pogodin' && beat < 2) c.current.beat++;
          else if (scene === 'pogodin') { c.flags.betaComplete = true; c.phase = 'beta_complete'; c.current = { mode: 'epilogue', scene: 'chapter1_boundary', beat: 0 }; c.storyLock.active = false; }
          pushLog(c, 'joint_action_resolved', null, { scene, beat, rolls });
        } else if (!this.presence()[other]) await safeNotify(this.env, c.players[other], 'Your decision is required in the current Story Lock.');
      } else if (b.type === 'free_roam_action') {
        if (c.current.mode !== 'free_roam') return json({ error: 'Free Roam is not available during Story Lock progression.' }, 409);
        const slot = nextSlot(c, seat); if (slot < 0) return json({ error: 'You have used all Free Roam time for this beta day.' }, 409);
        const loc = FREE_ROAM_LOCATIONS[b.location]; const act = loc?.actions?.[b.actionId]; if (!loc || !act) return json({ error: 'That Free Roam action is not available.' }, 400);
        let roll = null;
        if (act.move) roll = rollFor(c.players[seat].character, act.move);
        const result = { id: randId('fr_'), location: b.location, locationName: loc.name, actionId: b.actionId, label: act.label, prose: act.prose, clueId: act.clue, roll, art: loc.art, frame: loc.frame, at: Date.now() };
        c.freeRoam.slots[seat][slot] = result.id; c.freeRoam.lastResult[seat] = result; addPrivateClue(c, seat, act.clue, loc.name); pushLog(c, 'free_roam_action', seat, { location: b.location, action: b.actionId, roll });
        if (!c.flags.ambushDone && spentCount(c, 'A') >= 1 && spentCount(c, 'B') >= 1) { storyGate(c, 'ambush', true); await safeNotify(this.env, c.players[other], 'An event has interrupted Free Roam. Open Chagidiel when you can.'); }
        else if (c.flags.ambushDone && !c.flags.pogodinAvailable && (sharedClueCount(c) >= 3 || (spentCount(c,'A') >= 2 && spentCount(c,'B') >= 2))) { c.flags.pogodinAvailable = true; storyGate(c, 'pogodin', false); }
      } else if (b.type === 'share_clue') {
        const clueId = String(b.clueId || ''); if (!c.journal.private[seat].some(x => x.clueId === clueId)) return json({ error: 'You do not have that clue.' }, 400);
        if (!c.journal.shared.some(x => x.clueId === clueId)) c.journal.shared.push({ clueId, sourceSeat: seat, source: b.source || '', at: Date.now() }); pushLog(c, 'clue_shared', seat, { clueId });
        if (c.flags.ambushDone && !c.flags.pogodinAvailable && sharedClueCount(c) >= 3) { c.flags.pogodinAvailable = true; storyGate(c, 'pogodin', false); }
      } else if (b.type === 'roll') {
        const moveKey = String(b.move || ''); const move = MOVE_MAP[moveKey]; if (!move) return json({ error: 'Unknown move.' }, 400);
        const roll = rollFor(c.players[seat].character, moveKey, Number(b.extra || 0)); c.freeRoam.lastResult[seat] = { kind: 'roll', roll, at: Date.now() }; pushLog(c, 'roll_resolved', seat, { roll });
      } else return json({ error: 'Unknown action.' }, 400);
      await this.save(c); this.broadcast(c); return json({ ok: true, state: publicView(c, uid, this.presence()) });
    }
    return json({ error: 'Not found.' }, 404);
  }
}

function safeVoiceId(value) { const v = String(value || '').trim(); return /^[A-Za-z0-9_-]{10,64}$/.test(v) ? v : DEFAULT_VOICE_ID; }
async function shortHash(text) { const d = await sha(text); return [...d.slice(0, 10)].map(x => x.toString(16).padStart(2,'0')).join(''); }
async function listVoices(env) {
  if (!env.ELEVENLABS_API_KEY) return FEATURED_VOICES;
  const r = await fetch(`${ELEVEN_BASE}/v2/voices?page_size=100&sort=name&sort_direction=asc&include_total_count=false`, { headers: { 'xi-api-key': env.ELEVENLABS_API_KEY } });
  if (!r.ok) throw new Error(`ElevenLabs voices request failed (${r.status})`);
  const d = await r.json(); const voices = (d.voices || []).map(v => ({ voice_id: v.voice_id, name: v.name || 'Unnamed voice', category: v.category || '', description: v.description || '', labels: v.labels || {}, preview_url: v.preview_url || null }));
  for (const f of FEATURED_VOICES) if (!voices.some(v => v.voice_id === f.voice_id)) voices.push(f);
  return voices.sort((a,b) => (a.sangris_featured_rank ?? 999) - (b.sangris_featured_rank ?? 999) || String(a.name).localeCompare(String(b.name)));
}
async function tts(env, voiceId, text, key) {
  if (!env.ELEVENLABS_API_KEY) return json({ error: 'ElevenLabs secret is not configured.' }, 503);
  if (!env.NARRATION_AUDIO) return json({ error: 'Narration R2 binding is not configured.' }, 503);
  const cleaned = String(text || '').replace(/\r/g,'').trim(); if (!cleaned || cleaned.length > 18000) return json({ error: 'Invalid narration text.' }, 400);
  const version = await shortHash(`${MODEL_ID}\n${AUDIO_PROFILE_VERSION}\n${voiceId}\n${cleaned}`); const objectKey = `chagidiel/${voiceId}/${key}_${version}.mp3`;
  const cached = await env.NARRATION_AUDIO.get(objectKey); if (cached) { const h = new Headers(); cached.writeHttpMetadata(h); h.set('content-type','audio/mpeg'); h.set('x-narration-cache','HIT'); return new Response(cached.body,{headers:h}); }
  const r = await fetch(`${ELEVEN_BASE}/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=${OUTPUT_FORMAT}`, { method:'POST', headers:{'xi-api-key':env.ELEVENLABS_API_KEY,'content-type':'application/json',accept:'audio/mpeg'}, body:JSON.stringify({text:cleaned,model_id:MODEL_ID,voice_settings:VOICE_SETTINGS}) });
  if (!r.ok) return json({ error:'ElevenLabs generation failed.', status:r.status, detail:(await r.text()).slice(0,500) },502);
  const audio = await r.arrayBuffer(); await env.NARRATION_AUDIO.put(objectKey,audio,{httpMetadata:{contentType:'audio/mpeg'}}); return new Response(audio,{headers:{'content-type':'audio/mpeg','x-narration-cache':'MISS'}});
}

async function authFromRequest(request, env, url) { return verifySession(env, bearer(request, url)); }
function campaignStub(env, id) { return env.CAMPAIGNS.get(env.CAMPAIGNS.idFromName(id)); }
function authStub(env) { return env.AUTH.get(env.AUTH.idFromName('global')); }
async function forwardCampaign(request, env, id, path, user, body = null) {
  const h = new Headers(); h.set('x-chagidiel-user', user.uid); h.set('x-chagidiel-contact', user.contact); h.set('x-chagidiel-method', user.method); if (body !== null) h.set('content-type','application/json');
  return campaignStub(env,id).fetch(`https://campaign${path}`, { method: body === null ? request.method : 'POST', headers:h, body: body === null ? undefined : JSON.stringify(body) });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/health') return json({ ok:true, build:'chagidiel-beta-1', elevenlabsConfigured:!!env.ELEVENLABS_API_KEY, r2Configured:!!env.NARRATION_AUDIO, authSecretConfigured:!!env.AUTH_SECRET, smsConfigured:!!(env.TWILIO_ACCOUNT_SID&&env.TWILIO_AUTH_TOKEN&&env.TWILIO_FROM), emailConfigured:!!(env.RESEND_API_KEY&&env.RESEND_FROM), webPushConfigured:false },200,{'cache-control':'no-store'});
    if (url.pathname === '/api/config') return json({ vapidPublicKey: env.VAPID_PUBLIC_KEY || null, pushDelivery: false });
    if (url.pathname === '/api/auth/request' || url.pathname === '/api/auth/verify') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
      const target = `https://auth${url.pathname.endsWith('request') ? '/request' : '/verify'}`;
      const headers = new Headers(request.headers);
      const body = await request.text();
      return authStub(env).fetch(target, { method: 'POST', headers, body });
    }
    if (url.pathname === '/api/voices') { try { return json({ default_voice_id:DEFAULT_VOICE_ID, voices:await listVoices(env) }); } catch(e){ return json({error:String(e.message||e)},502); } }
    if (url.pathname === '/api/narration-page') {
      if (request.method !== 'POST') return json({error:'Method not allowed.'},405);
      let b; try{b=await request.json();}catch(_){return json({error:'Invalid JSON.'},400);} const voice=safeVoiceId(b.voice); const scene=String(b.scene||'page').replace(/[^A-Za-z0-9_-]/g,'').slice(0,80)||'page'; const hash=await shortHash(String(b.text||'')); return tts(env,voice,b.text,`${scene}_${hash}`);
    }
    if (url.pathname === '/api/campaigns' && request.method === 'POST') {
      const user = await authFromRequest(request,env,url); if(!user) return json({error:'Authentication required.'},401);
      const id = randId('c_').slice(0,18); const invite = randId('').slice(0,10).toUpperCase(); const h=new Headers({'x-chagidiel-user':user.uid,'x-chagidiel-contact':user.contact,'x-chagidiel-method':user.method,'content-type':'application/json'}); return campaignStub(env,id).fetch('https://campaign/init',{method:'POST',headers:h,body:JSON.stringify({id,invite})});
    }
    if (url.pathname === '/api/campaigns/join' && request.method === 'POST') {
      const user = await authFromRequest(request,env,url); if(!user) return json({error:'Authentication required.'},401); const b=await request.json(); const id=String(b.campaignId||''); if(!/^c_[a-f0-9]+$/.test(id)) return json({error:'Invalid campaign id.'},400); return forwardCampaign(request,env,id,'/join',user,{invite:b.invite});
    }
    const m = url.pathname.match(/^\/api\/campaigns\/(c_[a-f0-9]+)\/(state|action|ws)$/);
    if (m) {
      const user = await authFromRequest(request,env,url); if(!user) return json({error:'Authentication required.'},401); const id=m[1], op=m[2];
      if (op === 'ws') { const h=new Headers(request.headers); h.set('x-chagidiel-user',user.uid); h.set('x-chagidiel-contact',user.contact); h.set('x-chagidiel-method',user.method); return campaignStub(env,id).fetch('https://campaign/ws',{method:'GET',headers:h}); }
      if (op === 'state') return forwardCampaign(request,env,id,'/state',user,null);
      if (op === 'action') { if(request.method!=='POST') return json({error:'Method not allowed.'},405); const b=await request.json(); return forwardCampaign(request,env,id,'/action',user,b); }
    }
    return env.ASSETS.fetch(request);
  },
};
