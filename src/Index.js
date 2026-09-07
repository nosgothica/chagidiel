const DEFAULT_VOICE_ID = '54YYBuRuAG6KJooiOhFI';
const MODEL_ID = 'eleven_v3_conversational';
const OUTPUT_FORMAT = 'mp3_44100_128';
const ELEVEN_BASE = 'https://api.elevenlabs.io';
const AUDIO_PROFILE_VERSION = 'black-madonna-beta-12.2-v3-conversational-stream-v1';
const VOICE_SETTINGS = { stability: 0.5, speed: 1.0 };

// Keep the same featured ElevenLabs choices used by the current Sangris build.
// All additional voices saved to the connected ElevenLabs account are returned too.
const FEATURED_VOICES = [
  {
    voice_id: DEFAULT_VOICE_ID,
    name: 'Alice — Soothing, Calm and Youthful',
    category: 'featured',
    description: 'Calm featured narrator and The Black Madonna default.',
    labels: { use_case: 'narrative_story', sangris: 'featured' },
    preview_url: null,
    sangris_featured_rank: 0,
  },
  {
    voice_id: 'CKfuQaJKfvUG2Wtrda3Y',
    name: 'Lison — Seductive and soft French accent',
    category: 'featured',
    description: 'Soft, warm French-accented female voice.',
    labels: { accent: 'French', gender: 'female', use_case: 'characters_animation', sangris: 'featured' },
    preview_url: null,
    sangris_featured_rank: 1,
  },
  {
    voice_id: 'dTmTLshIypwp08eftJH6',
    name: 'Sylvie',
    category: 'featured',
    description: 'Classy French-accented female narrative voice.',
    labels: { accent: 'French', gender: 'female', use_case: 'narrative_story', sangris: 'featured' },
    preview_url: null,
    sangris_featured_rank: 2,
  },
  {
    voice_id: 'dEKbODj1fSHsx7xQNNLa',
    name: 'Grizzled Man — Raspy, Natural Narrator',
    category: 'featured',
    description: 'British, middle-aged male narrative voice with a grizzled natural rasp.',
    labels: { accent: 'British', gender: 'male', use_case: 'narrative_story', descriptive: 'raspy', sangris: 'featured' },
    preview_url: null,
    sangris_featured_rank: 3,
  },
];
const FEATURED_SHARED_SEARCHES = [
  {
    exactName: 'Dominic - British, Brooding, Intense',
    search: 'Dominic British Brooding Intense',
    rank: 4,
    description: 'British male performance voice with a brooding, intense delivery.',
  },
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
  stasi: 'Former Stasi Officer',
  diplomatic: 'Diplomatic Attaché',
  professor: 'Professor of History',
  black_marketeer: 'Black Marketeer',
  legionnaire: 'Foreign Legionnaire',
  journalist: 'Freelance Journalist',
  writer: 'Horror Writer',
  bookseller: 'Rare Book Dealer',
  kgb: 'Defected KGB Operative',
  literary_agent: 'Literary Agent',
  agent: 'Literary Agent', // backward-compatible beta key
};
const OCCUPATION_DETAILS = {
  stasi: { archetype: 'The Agent', languages: 'German native; English broken.' },
  diplomatic: { archetype: 'The Careerist', languages: 'Choose native tongue; German fluent.' },
  professor: { archetype: 'The Academic', languages: 'German native; Russian fluent; English and Polish broken.' },
  black_marketeer: { archetype: 'The Fixer', languages: 'German native; Russian, English, Swedish broken.' },
  legionnaire: { archetype: 'The Veteran', languages: 'Choose native tongue; German and French fluent; English broken.' },
  journalist: { archetype: 'The Detective', languages: 'German native; English fluent.' },
  writer: { archetype: 'The Artist', languages: 'German native; English fluent.' },
  bookseller: { archetype: 'The Occultist', languages: 'German native; English fluent; French, Hebrew, Latin, Greek, Arabic broken.' },
  kgb: { archetype: 'The Ronin', languages: 'Russian native; German and English fluent.' },
  literary_agent: { archetype: 'The Deceiver', languages: 'German native; English and French fluent; Russian broken.' },
  agent: { archetype: 'The Deceiver', languages: 'German native; English and French fluent; Russian broken.' },
};
const DARK_SECRETS = new Set(['broken_childhood','mental_illness','secret_past','strange_death','occult_fascination','guilty','addict','flashbacks']);
const FAMILIES = new Set(['alone','independent','chosen_family','single_fulfilled','committed_no_children','community','single_parent','fiance','divorced','accident','casual','joyless','destructive','abusive','happy']);
const RELATIONSHIP_TYPES = {
  married: 'Married',
  dating: 'Dating / romantic partners',
  engaged: 'Engaged',
  close_friends: 'Close friends',
  siblings: 'Siblings',
  cousins: 'Extended family / cousins',
  colleagues: 'Colleagues',
  former_partners: 'Former partners, still close',
  complicated: 'Complicated history',
  recent_acquaintances: 'Recent acquaintances',
  strangers: 'Strangers until recently',
};
const EAST_GERMAN_REGIONS = ['East Berlin / Brandenburg','Saxony / Thuringia','Mecklenburg / Saxony-Anhalt'];

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
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (raw.startsWith('+') && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  if (digits.length >= 11 && digits.length <= 15) return `+${digits}`;
  return '';
}
function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''));
}
function validPhone(value) {
  return /^\+[1-9]\d{7,14}$/.test(String(value || ''));
}
async function userIdFor(method, contact) {
  const digest = await sha(`${method}:${contact}`);
  return 'u_' + base64url(digest.slice(0, 12));
}
async function providerJson(response) {
  const text = await response.text();
  if (!text) return {};
  try { return JSON.parse(text); } catch (_) { return { message: text.slice(0, 500) }; }
}
function providerError(provider, response, data) {
  const raw = data?.message || data?.error?.message || data?.error || data?.detail || data?.code || `HTTP ${response.status}`;
  return `${provider}: ${String(raw).slice(0, 320)}`;
}
function twilioBasicAuth(env) {
  return `Basic ${btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`)}`;
}
function twilioCoreConfigured(env) {
  return !!(env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN);
}
function twilioVerifyConfigured(env) {
  return !!(twilioCoreConfigured(env) && env.TWILIO_VERIFY_SERVICE_SID);
}
function twilioMessagingConfigured(env) {
  return !!(twilioCoreConfigured(env) && env.TWILIO_FROM);
}

async function sendEmail(env, to, content, purpose = 'alert') {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) return { ok: false, configured: false, provider: 'resend', error: 'RESEND_API_KEY and RESEND_FROM are required.' };
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let subject;
  let text;
  let html;
  if (purpose === 'reset') {
    const resetUrl = String(content);
    subject = 'Reset your Black Madonna password';
    text = `A password reset was requested for your Black Madonna account. Open this link within 60 minutes: ${resetUrl}\n\nIf you did not request this, you can ignore this message.`;
    html = `<div style="background:#090807;color:#d8d0bc;padding:28px;font-family:Georgia,serif"><div style="color:#8f1f22;letter-spacing:.18em;text-transform:uppercase;font-size:12px">The Black Madonna</div><h1 style="font-weight:400">Password reset</h1><p>A password reset was requested for your account.</p><p><a style="display:inline-block;padding:12px 16px;background:#551317;color:#fff;text-decoration:none" href="${escapeHtml(resetUrl)}">Reset password</a></p><p style="color:#9c9588">This link expires in 60 minutes. If you did not request it, you can ignore this message.</p></div>`;
  } else if (purpose === 'login') {
    subject = 'Your Black Madonna login code';
    text = `Your Black Madonna login code is ${content}. It expires in 10 minutes.`;
    html = `<div style="background:#090807;color:#d8d0bc;padding:28px;font-family:Georgia,serif"><div style="color:#8f1f22;letter-spacing:.18em;text-transform:uppercase;font-size:12px">The Black Madonna</div><h1 style="font-weight:400">Your login code</h1><p>Enter this six-digit code to continue:</p><div style="font-size:32px;letter-spacing:.22em;color:#fff;margin:24px 0">${escapeHtml(content)}</div><p style="color:#9c9588">This code expires in 10 minutes. If you did not request it, you can ignore this message.</p></div>`;
  } else {
    subject = 'The Black Madonna - your protagonist is needed';
    text = String(content);
    html = `<div style="background:#090807;color:#d8d0bc;padding:28px;font-family:Georgia,serif"><div style="color:#8f1f22;letter-spacing:.18em;text-transform:uppercase;font-size:12px">The Black Madonna</div><p>${escapeHtml(content)}</p></div>`;
  }
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: env.RESEND_FROM, to: [to], subject, html, text }),
    });
    const data = await providerJson(r);
    if (!r.ok) return { ok: false, configured: true, provider: 'resend', status: r.status, error: providerError('Resend', r, data) };
    return { ok: true, configured: true, provider: 'resend', id: data?.id || null };
  } catch (e) {
    return { ok: false, configured: true, provider: 'resend', error: `Resend network error: ${String(e?.message || e)}` };
  }
}

async function sendSmsMessage(env, to, body) {
  if (!twilioMessagingConfigured(env)) return { ok: false, configured: false, provider: 'twilio_messages', error: 'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM are required for SMS alerts.' };
  const form = new URLSearchParams({ To: to, From: env.TWILIO_FROM, Body: body });
  try {
    const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(env.TWILIO_ACCOUNT_SID)}/Messages.json`, {
      method: 'POST',
      headers: { authorization: twilioBasicAuth(env), 'content-type': 'application/x-www-form-urlencoded' },
      body: form,
    });
    const data = await providerJson(r);
    if (!r.ok) return { ok: false, configured: true, provider: 'twilio_messages', status: r.status, error: providerError('Twilio Messages', r, data) };
    return { ok: true, configured: true, provider: 'twilio_messages', id: data?.sid || null };
  } catch (e) {
    return { ok: false, configured: true, provider: 'twilio_messages', error: `Twilio network error: ${String(e?.message || e)}` };
  }
}

async function startTwilioVerification(env, to) {
  if (!twilioVerifyConfigured(env)) return { ok: false, configured: false, provider: 'twilio_verify', error: 'TWILIO_VERIFY_SERVICE_SID is not configured.' };
  const form = new URLSearchParams({ To: to, Channel: 'sms' });
  try {
    const r = await fetch(`https://verify.twilio.com/v2/Services/${encodeURIComponent(env.TWILIO_VERIFY_SERVICE_SID)}/Verifications`, {
      method: 'POST',
      headers: { authorization: twilioBasicAuth(env), 'content-type': 'application/x-www-form-urlencoded' },
      body: form,
    });
    const data = await providerJson(r);
    if (!r.ok) return { ok: false, configured: true, provider: 'twilio_verify', status: r.status, error: providerError('Twilio Verify', r, data) };
    return { ok: data?.status === 'pending' || !!data?.sid, configured: true, provider: 'twilio_verify', status: data?.status || 'pending', id: data?.sid || null };
  } catch (e) {
    return { ok: false, configured: true, provider: 'twilio_verify', error: `Twilio Verify network error: ${String(e?.message || e)}` };
  }
}

async function checkTwilioVerification(env, to, code) {
  if (!twilioVerifyConfigured(env)) return { ok: false, configured: false, provider: 'twilio_verify', error: 'TWILIO_VERIFY_SERVICE_SID is not configured.' };
  const form = new URLSearchParams({ To: to, Code: code });
  try {
    const r = await fetch(`https://verify.twilio.com/v2/Services/${encodeURIComponent(env.TWILIO_VERIFY_SERVICE_SID)}/VerificationCheck`, {
      method: 'POST',
      headers: { authorization: twilioBasicAuth(env), 'content-type': 'application/x-www-form-urlencoded' },
      body: form,
    });
    const data = await providerJson(r);
    if (!r.ok) return { ok: false, configured: true, provider: 'twilio_verify', status: r.status, error: providerError('Twilio Verify', r, data) };
    return { ok: data?.status === 'approved', configured: true, provider: 'twilio_verify', status: data?.status || 'pending' };
  } catch (e) {
    return { ok: false, configured: true, provider: 'twilio_verify', error: `Twilio Verify network error: ${String(e?.message || e)}` };
  }
}

const RESET_TTL_MS = 60 * 60 * 1000;
const PASSWORD_ALGORITHM = 'HMAC-SHA256-PEPPERED-v1';

function validPassword(password) {
  const value = String(password || '');
  return value.length >= 10 && value.length <= 128;
}
function equalBytes(a, b) {
  if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array) || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
async function derivePassword(env, password, salt = null) {
  if (!env.AUTH_SECRET) throw new Error('AUTH_SECRET is not configured.');
  const saltBytes = salt ? unbase64url(salt) : crypto.getRandomValues(new Uint8Array(16));
  const saltText = base64url(saltBytes);
  const digest = await hmac(env.AUTH_SECRET, `chagidiel-password-v1\n${saltText}\n${String(password)}`);
  return { algorithm: PASSWORD_ALGORITHM, salt: saltText, hash: base64url(digest) };
}
async function verifyPassword(env, password, record) {
  if (!record?.salt || !record?.hash) return false;
  if (record.algorithm !== PASSWORD_ALGORITHM) return false;
  const candidate = await derivePassword(env, password, record.salt);
  return equalBytes(unbase64url(candidate.hash), unbase64url(record.hash));
}
function randomResetToken() {
  const b = crypto.getRandomValues(new Uint8Array(32));
  return base64url(b);
}
function publicAccount(user) {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    contact: user.email,
    method: 'email',
    role: user.role || 'player',
    disabled: !!user.disabled,
    createdAt: user.createdAt || null,
    lastLoginAt: user.lastLoginAt || null,
    passwordChangedAt: user.passwordChangedAt || null,
  };
}

function publicCharacterRecord(rec) {
  if (!rec) return null;
  return {
    id: rec.id,
    createdAt: rec.createdAt || null,
    updatedAt: rec.updatedAt || null,
    character: rec.character || null,
  };
}
function publicDraftRecord(rec) {
  if (!rec) return null;
  return { id: rec.id, createdAt: rec.createdAt || null, updatedAt: rec.updatedAt || null, draft: rec.draft || {} };
}
function cleanDraftPayload(value) {
  let raw = '';
  try { raw = JSON.stringify(value || {}); } catch (_) { return { error: 'Draft data is invalid.' }; }
  if (raw.length > 30000) return { error: 'Character draft is too large.' };
  let draft; try { draft = JSON.parse(raw); } catch (_) { return { error: 'Character draft is invalid.' }; }
  draft.stage = Math.max(0, Math.min(7, Number(draft.stage || 0)));
  return { draft };
}
function characterStoragePrefix(uid) { return `character:${String(uid || '')}:`; }
function characterStorageKey(uid, id) { return `${characterStoragePrefix(uid)}${String(id || '')}`; }
function characterDraftPrefix(uid) { return `character-draft:${String(uid || '')}:`; }
function characterDraftKey(uid, id) { return `${characterDraftPrefix(uid)}${String(id || '')}`; }
function campaignMemoryKey(uid) { return `campaigns:${String(uid || '')}`; }
function validCharacterId(id) { return /^pc_[a-f0-9]{8,64}$/.test(String(id || '')); }
function validDraftId(id) { return /^dr_[a-f0-9]{8,64}$/.test(String(id || '')); }
function validCampaignId(id) { return /^c_[a-f0-9]+$/.test(String(id || '')); }
async function signUserSession(env, user) {
  return signSession(env, {
    uid: user.uid,
    contact: user.email,
    email: user.email,
    method: 'email',
    role: user.role || 'player',
    sv: Number(user.sessionVersion || 1),
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });
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

const SEATS = ['A','B','C'];
function blankReady() { return { A:false, B:false, C:false }; }
function blankSeatState() { return { A:null, B:null, C:null }; }
function playerRecord(creator) {
  return { uid: creator.uid, contact: creator.contact, method: creator.method, characterId: null, character: null, characterHistory: [], entry: null, lastSeen: Date.now(), prefs: { storyAlerts: true, evidenceAlerts: true }, backgroundEditUsed: false };
}
function newCampaign(id, invite, creator, name = '', testMode = false) {
  testMode = !!testMode;
  return {
    version: 7,
    testMode,
    id,
    name: String(name || '').trim().slice(0,80) || `Black Madonna — ${String(id || '').slice(-6).toUpperCase()}`,
    invite: null,
    invites: testMode ? { B:null, C:null } : { B: invite, C: randId('').slice(0,10).toUpperCase() },
    createdAt: Date.now(),
    revision: 1,
    phase: 'lobby',
    players: { A: playerRecord(creator), B: null, C: null },
    relationships: {},
    current: { mode: 'lobby', scene: 'setup', beat: 0 },
    storyLock: { gate: null, active: false, ready: blankReady(), actions: {}, participants: [], lastResolution: null, turn: null },
    freeRoam: { day: '17 September 1991', slots: { A:[null,null,null], B:[null,null,null], C:[null,null,null] }, lastResult: blankSeatState() },
    journal: { shared: [], private: { A:[], B:[], C:[] } },
    flags: { goldPlaqueDone:false, ambushDone:false, pogodinAvailable:false, betaComplete:false, marked:{A:false,B:false,C:false}, infection:{A:false,B:false,C:false} },
    processedActions: [],
    log: [],
  };
}
function ensureCampaignShape(c) {
  if (!c) return c;
  c.version = Math.max(7, Number(c.version || 1));
  c.testMode = !!c.testMode;
  if (!c.name) c.name = `Black Madonna — ${String(c.id || '').slice(-6).toUpperCase()}`;
  c.players = c.players || {};
  if (!('C' in c.players)) c.players.C = null;
  for (const seat of SEATS) if (c.players[seat]) {
    if (!Array.isArray(c.players[seat].characterHistory)) c.players[seat].characterHistory = [];
    if (typeof c.players[seat].backgroundEditUsed !== 'boolean') c.players[seat].backgroundEditUsed = false;
  }
  c.invites = c.invites || { B: c.players.B ? null : (c.invite || null), C: null };
  if (!('B' in c.invites)) c.invites.B = c.players.B ? null : (c.invite || null);
  if (!('C' in c.invites)) c.invites.C = null;
  if (c.testMode) c.invites = { B:null, C:null };
  c.invite = null;
  c.relationships = c.relationships || {};
  c.storyLock = c.storyLock || {};
  c.storyLock.ready = { ...blankReady(), ...(c.storyLock.ready || {}) };
  c.storyLock.actions = c.storyLock.actions || {};
  c.storyLock.participants = Array.isArray(c.storyLock.participants) ? c.storyLock.participants.filter(x => SEATS.includes(x)) : [];
  if (c.current?.mode === 'story_lock' && c.storyLock.active && c.storyLock.participants.length && !c.storyLock.turn) c.storyLock.turn = makeInitiativeState(c, c.storyLock.participants);
  if (c.storyLock.turn) {
    const t=c.storyLock.turn;
    t.order=Array.isArray(t.order)?t.order.filter(st=>c.storyLock.participants.includes(st)&&c.players?.[st]?.character):[];
    if (!t.order.length && c.storyLock.participants.length) c.storyLock.turn=makeInitiativeState(c,c.storyLock.participants);
    else {
      t.initiative=t.initiative||{}; t.index=Math.max(0,Math.min(t.order.length-1,Number(t.index||0)));
      t.round=Math.max(1,Number(t.round||Number(c.current?.beat||0)+1));
      t.usedChoices=Array.isArray(t.usedChoices)?t.usedChoices:[]; t.responses=Array.isArray(t.responses)?t.responses:[];
      t.lastResponse=t.lastResponse||null; t.currentSeat=t.order[t.index]||null;
    }
  }
  if (c.storyLock.lastResolution) {
    const lr = c.storyLock.lastResolution;
    lr.pending = lr.pending !== false;
    lr.scene = lr.scene || c.current?.scene || null;
    lr.beat = Number.isFinite(Number(lr.beat)) ? Number(lr.beat) : Math.max(0, Number(c.current?.beat || 0) - 1);
    lr.participants = Array.isArray(lr.participants) ? lr.participants.filter(x => SEATS.includes(x)) : [...c.storyLock.participants];
    lr.acknowledged = { ...blankReady(), ...(lr.acknowledged || {}) };
  }
  if (c.storyLock.gate) {
    c.storyLock.gate.acknowledged = { ...blankReady(), ...(c.storyLock.gate.acknowledged || {}) };
    if (!c.storyLock.gate.requirement) c.storyLock.gate.requirement = c.storyLock.gate.scene === 'ambush' ? 'quorum_2' : 'full_party';
  }
  c.freeRoam = c.freeRoam || { day:'17 September 1991', slots:{}, lastResult:{} };
  c.freeRoam.slots = c.freeRoam.slots || {};
  c.freeRoam.lastResult = c.freeRoam.lastResult || {};
  for (const seat of SEATS) {
    if (!Array.isArray(c.freeRoam.slots[seat])) c.freeRoam.slots[seat] = [null,null,null];
    if (!(seat in c.freeRoam.lastResult)) c.freeRoam.lastResult[seat] = null;
  }
  c.journal = c.journal || { shared:[], private:{} };
  c.journal.shared = c.journal.shared || [];
  c.journal.private = c.journal.private || {};
  for (const seat of SEATS) if (!Array.isArray(c.journal.private[seat])) c.journal.private[seat] = [];
  c.flags = c.flags || {};
  c.flags.marked = { A:false,B:false,C:false, ...(c.flags.marked || {}) };
  c.flags.infection = { A:false,B:false,C:false, ...(c.flags.infection || {}) };
  c.processedActions = Array.isArray(c.processedActions) ? c.processedActions : [];
  c.log = Array.isArray(c.log) ? c.log : [];
  return c;
}
function resetCharacterForNewRun(character) {
  if (!character) return null;
  let copy; try { copy = JSON.parse(JSON.stringify(character)); } catch (_) { copy = { ...character }; }
  copy.stability = 'Composed';
  copy.wounds = [];
  return copy;
}
function resetCampaignProgress(c) {
  const now = Date.now();
  const originalRevision = Number(c.revision || 0);
  const preserved = {};
  for (const seat of SEATS) {
    const p = c.players?.[seat];
    if (!p) { preserved[seat] = null; continue; }
    preserved[seat] = {
      uid:p.uid, contact:p.contact, method:p.method,
      characterId:p.characterId || null,
      character:resetCharacterForNewRun(p.character),
      characterHistory:[], entry:null, lastSeen:now,
      prefs:{ storyAlerts:true, evidenceAlerts:true, ...(p.prefs || {}) },
      backgroundEditUsed:false,
    };
  }
  const creator = preserved.A || { uid:'', contact:'', method:'email' };
  const fresh = newCampaign(c.id, c.invites?.B || randId('').slice(0,10).toUpperCase(), creator, c.name, c.testMode);
  fresh.createdAt = c.createdAt || now;
  fresh.name = c.name || fresh.name;
  fresh.players = preserved;
  fresh.invites = {
    B: preserved.B ? null : (c.invites?.B || fresh.invites.B),
    C: preserved.C ? null : (c.invites?.C || fresh.invites.C),
  };
  fresh.relationships = Object.fromEntries(Object.entries(c.relationships || {}).filter(([_, r]) => r?.status === 'accepted' && Array.isArray(r.seats) && r.seats.every(st => preserved[st]?.character)));
  fresh.revision = originalRevision;
  fresh.resetAt = now;
  fresh.resetCount = Number(c.resetCount || 0) + 1;
  const primaryReady = fresh.testMode ? !!fresh.players.A?.character : (!!fresh.players.A?.character && !!fresh.players.B?.character);
  const optionalReady = fresh.testMode ? true : (!fresh.players.C || !!fresh.players.C.character);
  if (primaryReady && optionalReady) { storyGate(fresh, 'gold_plaque', false); fresh.phase = 'chapter1'; }
  return fresh;
}
function seatFor(c, uid) {
  for (const seat of SEATS) if (c.players?.[seat]?.uid === uid) return seat;
  return null;
}
function occupiedSeats(c, requireCharacter = false) {
  return SEATS.filter(seat => c.players?.[seat] && (!requireCharacter || c.players[seat].character));
}
function otherSeats(c, seat, requireCharacter = false) { return occupiedSeats(c, requireCharacter).filter(x => x !== seat); }
function primaryCounterpart(c, seat) {
  const order = seat === 'A' ? ['B','C'] : seat === 'B' ? ['A','C'] : ['A','B'];
  return order.find(x => c.players?.[x]) || null;
}
function relationshipKey(a,b) { return [a,b].sort().join(':'); }
function storyRequirement(scene) { return ['gold_plaque','pogodin'].includes(scene) ? 'full_party' : 'quorum_2'; }
function storyMaxBeat(scene) { return scene === 'gold_plaque' ? 2 : scene === 'ambush' ? 1 : scene === 'pogodin' ? 2 : 0; }
function storyResolutionReady(c) { return !!(c?.current?.mode === 'story_lock' && c?.storyLock?.lastResolution?.pending); }
function requiredSeatsForGate(c, requirement) {
  const eligible = occupiedSeats(c, true);
  if (c.testMode) return eligible.slice(0,1);
  if (requirement === 'full_party') return eligible;
  return [];
}
function initiativeRoll(c, seat) {
  const reflexes=attrValue(c.players?.[seat]?.character,'reflexes');
  const r=roll2d10(reflexes);
  return { seat, dice:r.dice, modifier:reflexes, total:r.total };
}
function makeInitiativeState(c, participants) {
  const eligible=(participants||[]).filter(st=>c.players?.[st]?.character);
  const rolls=eligible.map(st=>initiativeRoll(c,st)).sort((a,b)=>b.total-a.total || b.modifier-a.modifier || a.seat.localeCompare(b.seat));
  const initiative=Object.fromEntries(rolls.map(r=>[r.seat,r]));
  const order=rolls.map(r=>r.seat);
  return { order, initiative, index:0, currentSeat:order[0]||null, round:Number(c.current?.beat||0)+1, usedChoices:[], responses:[], lastResponse:null };
}
function resetInitiativeBeat(c) {
  const t=c.storyLock.turn || makeInitiativeState(c,c.storyLock.participants||[]);
  const order=(t.order||[]).filter(st=>(c.storyLock.participants||[]).includes(st)&&c.players?.[st]?.character);
  c.storyLock.turn={ order, initiative:t.initiative||{}, index:0, currentSeat:order[0]||null, round:Number(c.current?.beat||0)+1, usedChoices:[], responses:[], lastResponse:null };
}
function activeTurnSeat(c) { return c.storyLock?.turn?.order?.[Number(c.storyLock?.turn?.index||0)] || null; }
function availableTurnChoices(c, seat) {
  const used=new Set(c.storyLock?.turn?.usedChoices||[]);
  return lockChoices(c,seat).filter(choice=>choice.repeatable===true || !used.has(choice.id));
}
function immediateTurnResponse(c, seat, action) {
  const name=c.players?.[seat]?.character?.name || 'Someone';
  const id=action?.id||'';
  const lines={
    mingle:`${name} lets the reception carry them from one knot of conversation to the next. Faces acquire names, alliances, irritations, and histories; the room becomes less anonymous with every exchange.`,
    stay_together:`${name} stays near the people they came in with, listening more than performing. The choice makes small reactions easier to notice and gives the group a quiet point of return amid the reception.`,
    work_room:`${name} turns professional introductions into something useful. Publishers, officials, writers, and intermediaries begin attaching themselves to reputations that may matter later.`,
    watch_exits:`${name} keeps attention on doors, staff, coats, and departures. Nothing is wrong yet, but the room develops a rhythm—and rhythms make interruptions easier to recognize.`,
    approach_magda:`${name} starts toward Magda before the moment can close. Magda notices the movement almost at once; the three men beside her notice it too, and their response is nothing like ordinary social discomfort.`,
    watch_russians:`${name} watches the three men instead of looking away. A glass slips in one hand, another man reaches for a handkerchief, and all three keep checking the same part of the room as if confirming a threat.`,
    identify_filip:`${name} searches memory for the exhausted man's face and finds a name: Filip Kramer. The recognition explains who he is, but not why recognition seems to terrify him in return.`,
    hang_back:`${name} stays out of the exchange and lets body language answer first. Magda looks confused. The men look afraid. Whatever is passing between them, she is not the one controlling it.`,
    ask_nightmares:`${name} asks Magda to stop speaking around the dream and describe it. She goes still before answering: childhood, punishment, a locked darkness, something moving nearby, and pain that breaks the memory into pieces.`,
    ask_men:`${name} asks who the three men were. Magda names Anton Mahler, Aleksandr “Sasha” Pogodin, and Filip Kramer—friends from her youth whose return to her life has brought more unease than comfort.`,
    reassure:`${name} shifts the conversation away from questions and toward concern. Magda admits she came back from Berlin hoping Hamburg would let her sleep, and that what frightens her most is being told there is nothing wrong.`,
    follow_russians:`${name} leaves the conversation before the three men can disappear. They do not linger outside; their departure has the efficiency of people who agreed that remaining near this room was dangerous.`,
    cover:`${name} moves for cover before trying to understand everything at once. The decision sacrifices a clean view of the street but forces the attackers to adjust their angles.`,
    protect:`${name} moves toward the nearest exposed companion instead of taking the safest line alone. The choice costs distance but makes it harder for the attackers to isolate anyone.`,
    observe:`${name} looks past the first burst of danger long enough to find the useful details: the running Dodge, the shooters' spacing, and the route they mean to use if the attack turns against them.`,
    return_fire:`${name} answers violence with violence. The attackers expected frightened targets; return fire forces them to remember that they can be hurt.`,
    rush_van:`${name} closes distance on the Dodge before the crew can reposition. For several seconds the attackers have to choose between continuing the job and protecting their way out.`,
    escape:`${name} chooses survival over a clean answer and breaks the geometry of the ambush. The attackers cannot keep a firing line without exposing themselves to witnesses.`,
    suppress:`${name} keeps pressure on the attackers long enough to create movement where there was none. Their advance stalls and attention begins shifting toward the van.`,
    disable_van:`${name} goes after the vehicle rather than the men. Even partial damage threatens to make their retreat louder, slower, and much less controlled.`,
    take_prisoner:`${name} tries to turn one attacker into an answer. The attempt forces the others to close ranks around their own man instead of finishing the attack cleanly.`,
    surveil:`${name} studies the estate before asking it to reveal anything. Guard changes, blind spots, and routines slowly turn wealth and security into a pattern that can be used.`,
    sneak:`${name} chooses the quiet way in, using the estate's size against the people paid to control it. Every closed door becomes a question of timing rather than permission.`,
    bluff:`${name} approaches through the front of the problem with a story already prepared. Confidence buys time, but every second inside the cover story raises the price of being discovered.`,
    wait:`${name} lets the Inner Circle settle before moving. Patience reduces traffic through the house and increases the chance that the people who matter are already below.`,
    rescue:`${name} stops treating the prisoners as background to the investigation. Helping them costs time and makes silence harder, but it also changes what the night is allowed to sacrifice.`,
    temple:`${name} pushes toward the ritual space before the house can fully react. Symbols, heat, and voices grow stronger as the domestic architecture gives way to something built for another purpose.`,
    chaos:`${name} creates trouble above to pull attention away from below. The diversion is messy enough to make the guards uncertain which emergency is the real one.`,
    police:`${name} tries to make the outside world matter. Calls, names, and official pressure begin moving toward the estate, even if the people inside have spent years learning how to survive ordinary scrutiny.`,
    perform_ritual:`${name} commits to the rite. The words and geometry answer with a depth the basement cannot physically contain, and the darkness beyond it begins to feel occupied.`,
    rescue_first:`${name} refuses to let the prisoners become acceptable losses. The ritual loses the clean timing its designers expected as living people are moved out of its reach.`,
    destroy:`${name} attacks the structure of the rite itself—symbols, materials, sequence—turning certainty into interruption.`,
    withdraw:`${name} refuses the promise that one more step will make everything comprehensible. Leaving does not solve the problem, but it denies the room the decision it was built to extract.`
  };
  const text=[lines[id]||`${name} commits to the choice, and the room answers.`];
  const r=action?.roll;
  if (r?.outcome==='complete') text.push('The timing is right. The choice creates room for whatever comes next.');
  else if (r?.outcome==='complication') text.push('It works, but not cleanly. Something in the situation shifts against the group as the next person moves.');
  else if (r?.outcome==='failure') text.push('The attempt costs more than intended, and the situation tightens around everyone still inside it.');
  return { seat, name, actionId:id||null, label:action?.label||'', roll:r||null, text, at:Date.now() };
}

function cleanArrayText(value, maxItems = 4, maxLen = 220) {
  return Array.isArray(value) ? value.slice(0, maxItems).map(x => String(x || '').slice(0, maxLen)) : [];
}
function legalAttributeSpread(attrs) {
  const passive = ['fortitude','reflexes','willpower'].map(k => Number(attrs[k])).sort((a,b) => b-a);
  const active = ['charisma','coolness','intuition','perception','reason','soul','violence'].map(k => Number(attrs[k])).sort((a,b) => b-a);
  return passive.join(',') === '2,1,0' && active.join(',') === '3,2,1,1,0,-1,-2';
}
function cleanCharacter(input) {
  const attrs = {};
  const keys = ['fortitude','willpower','reflexes','reason','intuition','perception','coolness','violence','charisma','soul'];
  for (const k of keys) {
    const n = Number(input?.attributes?.[k]);
    if (!Number.isFinite(n) || n < -2 || n > 3) return { error: 'Every starting Attribute must be between -2 and +3.' };
    attrs[k] = n;
  }
  if (!legalAttributeSpread(attrs)) return { error: 'Starting Attributes must use the Black Madonna spreads exactly: Passive +2/+1/+0; Active +3/+2/+1/+1/+0/-1/-2.' };
  const firstName = String(input?.firstName || '').trim().slice(0, 40);
  const lastName = String(input?.lastName || '').trim().slice(0, 40);
  if (!firstName || !lastName) return { error: 'A first and last name are required.' };
  const occupation = OCCUPATIONS[input?.occupation] ? input.occupation : null;
  if (!occupation) return { error: 'Choose a valid Black Madonna occupation.' };
  const relation = MAGDA_RELATIONS[input?.relation] ? input.relation : null;
  if (!relation) return { error: 'Choose a valid relationship with Magda Orlova.' };
  const darkSecret = DARK_SECRETS.has(input?.darkSecret) ? input.darkSecret : null;
  const family = FAMILIES.has(input?.family) ? input.family : null;
  if (!darkSecret || !family) return { error: 'Choose one campaign Dark Secret and one Family option.' };
  const origin = input?.origin && typeof input.origin === 'object' ? {
    country: String(input.origin.country || '').slice(0, 40),
    countryLabel: String(input.origin.countryLabel || '').slice(0, 80),
    region: String(input.origin.region || '').slice(0, 120),
    currentBase: String(input.origin.currentBase || '').slice(0, 80),
    germanyHistory: String(input.origin.germanyHistory || '').slice(0, 40),
    germanyHistoryLabel: String(input.origin.germanyHistoryLabel || '').slice(0, 160),
    germanyReason: String(input.origin.germanyReason || '').slice(0, 40),
    germanyReasonLabel: String(input.origin.germanyReasonLabel || '').slice(0, 160),
  } : {};
  const ageBand = String(input?.ageBand || '').slice(0, 16);
  if (relation === 'child') {
    const eastBorn = origin.country === 'germany' && EAST_GERMAN_REGIONS.includes(origin.region);
    if (ageBand !== '23–29' || !eastBorn) return { error: 'Child of Magda Orlova requires age 23–29 and East German origin.' };
  }
  const detail = OCCUPATION_DETAILS[occupation];
  return { character: {
    firstName, lastName, name: `${firstName} ${lastName}`.slice(0, 80),
    namingStyle: String(input?.namingStyle || 'unrestricted').slice(0, 24),
    origin,
    ageBand,
    presentation: String(input?.presentation || '').slice(0, 40),
    presentationLabel: String(input?.presentationLabel || '').slice(0, 120),
    occupation,
    occupationName: OCCUPATIONS[occupation],
    occupationArchetype: detail.archetype,
    languages: detail.languages,
    occupationAnswers: cleanArrayText(input?.occupationAnswers, 2),
    darkSecret,
    darkSecretName: String(input?.darkSecretName || '').slice(0, 100),
    darkSecretAnswers: cleanArrayText(input?.darkSecretAnswers, 2),
    family,
    familyName: String(input?.familyName || '').slice(0, 120),
    familyRelation: String(input?.familyRelation || '').slice(0, 120),
    familyAnswers: cleanArrayText(input?.familyAnswers, 2),
    relation,
    relationName: MAGDA_RELATIONS[relation],
    relationRating: String(input?.relationRating || '').slice(0, 40),
    attributes: attrs,
    advantages: [],
    disadvantages: [],
    rulesVersion: 'black_madonna_campaign+player_moves_2_alpha',
    stability: 'Composed',
    wounds: [],
  }};
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
  const requirement = storyRequirement(scene);
  c.current = { mode: 'story_gate', scene, beat: 0 };
  c.storyLock = { gate: { scene, forced, requirement, requiredSeats: requiredSeatsForGate(c, requirement), acknowledged: blankReady() }, active: false, ready: blankReady(), actions: {}, participants: [], lastResolution: null, turn: null };
}
function activateStory(c, scene, participants = null) {
  const eligible = occupiedSeats(c, true);
  const chosen = (participants || eligible).filter(x => eligible.includes(x));
  c.current = { mode: 'story_lock', scene, beat: 0 };
  c.storyLock.active = true;
  c.storyLock.gate = null;
  c.storyLock.actions = {};
  c.storyLock.participants = chosen;
  c.storyLock.lastResolution = null;
  c.storyLock.turn = makeInitiativeState(c, chosen);
  pushLog(c,'initiative_rolled',null,{scene,order:c.storyLock.turn.order,initiative:c.storyLock.turn.initiative});
}
function finishStory(c, nextMode = 'free_roam') {
  c.storyLock.active = false;
  c.storyLock.actions = {};
  c.storyLock.ready = blankReady();
  c.storyLock.participants = [];
  c.storyLock.gate = null;
  c.storyLock.lastResolution = null;
  c.storyLock.turn = null;
  if (nextMode === 'free_roam') c.current = { mode: 'free_roam', scene: 'berlin_free_roam', beat: 0 };
}

function occupationEcho(character, scene) {
  const occupation = character?.occupation;
  const map = {
    gold_plaque: {
      stasi: 'Crowds like this used to be work: faces, exits, who speaks too softly, who keeps checking the door. The habit remains even if the institution does not.',
      diplomatic: 'You know this kind of room. Politeness is a tool, introductions are transactions, and almost everyone is pretending not to measure everyone else.',
      professor: 'The ceremony has the strained formality of an academic reception with more money and less honesty. You recognize people by citation, scandal, and reputation before face.',
      black_marketeer: 'You read the room in practical terms: who has access, who owes whom, who is wearing something they could not have bought through ordinary channels.',
      legionnaire: 'Your attention keeps returning to exits, sight-lines, and hands. It is difficult to attend a civilian reception without quietly turning it into terrain.',
      journalist: 'Names arrange themselves into leads before you can stop them. Publishers, writers, politicians, and the people who hover near them are all potential sources.',
      writer: 'The party is already editing itself in your head: chandelier light, rain on glass, expensive voices flattening fear into anecdote.',
      bookseller: 'The room contains people who know the price of rare books and people who only know the prestige of owning them. You can usually tell which is which.',
      kgb: 'You were trained to notice surveillance before conversation. Tonight, several people are watching the room too carefully for civilians.',
      literary_agent: 'Everyone here wants something from someone else. That makes the room legible.'
    },
    ambush: {
      stasi: 'The first seconds feel horribly familiar: identify the threat, identify the route, identify who is already compromised.',
      diplomatic: 'Protocol becomes useless the instant the first shot is fired. What remains is judgment under pressure.',
      professor: 'There is no useful theory for the sound of a bullet arriving before you understand where it came from.',
      black_marketeer: 'People who mean to frighten you usually advertise it. Professionals do not. These men look professional.',
      legionnaire: 'Training takes the first second away from fear and gives it to movement.',
      journalist: 'Part of you is already recording details—the van, the angle, the faces—even while the rest of you tries to stay alive.',
      writer: 'Violence is faster and less elegant than it ever is on the page.',
      bookseller: 'The attack makes every occult theory feel offensively abstract. Somebody has chosen rifles instead.',
      kgb: 'This is an operation, not a warning. You recognize the difference immediately.',
      literary_agent: 'There is no negotiation in the opening seconds. That, more than the gunfire, tells you what sort of people these are.'
    },
    pogodin: {
      stasi: 'Security routines are still routines. The old part of your mind begins cataloguing them before you consciously decide to.',
      diplomatic: 'The mansion is power made architectural: privacy, guards, controlled access, and the confidence that consequences happen to other people.',
      professor: 'The ritual architecture borrows from traditions that should not fit together. Somehow, here, they do.',
      black_marketeer: 'Money explains the guards and the house. It does not explain what has been built beneath it.',
      legionnaire: 'The estate has defensible approaches and disciplined men. You stop thinking of it as a residence.',
      journalist: 'Every closed door feels like a source refusing comment. The difference is that these sources may shoot you.',
      writer: 'The house has the unpleasant quality of a place that would be called unbelievable if you invented it.',
      bookseller: 'Symbols you have seen reproduced badly in expensive books are cut here with the confidence of people who believe they know what they are doing.',
      kgb: 'Compartmentalization, guards, controlled movement, ritualized loyalty: the structure feels political even before it becomes supernatural.',
      literary_agent: 'The people above are protecting reputations. The people below are protecting something else.'
    }
  };
  return map[scene]?.[occupation] || null;
}
function magdaEcho(character, scene) {
  if (scene !== 'gold_plaque') return null;
  const map = {
    child: 'Magda is not merely the woman everyone else is waiting to meet. Whatever years were taken from you, her face still belongs to the unfinished business of family.',
    journalism: 'You have seen Magda tired before, after deadlines and bad interviews. This is different. She looks as though sleep itself has become dangerous.',
    bookstore: 'You remember her behind a counter with dust on her sleeves and an opinion about almost every book you picked up. The woman entering the room tonight looks decades older than that memory should allow.',
    friend: 'You know Magda well enough to recognize the effort behind her smile and not well enough to know what she is hiding.',
    helped: 'Once, Magda noticed that you were falling apart before you admitted it yourself. Tonight the direction of that debt has reversed.',
    lover: 'There are expressions you remember from closer distances than this. Fear was never one of the ones she wore easily.',
    literary: 'You have watched Magda move through rooms like this before. Tonight she does not work the crowd; she endures it.'
  };
  return map[character?.relation] || null;
}
function darkSecretEcho(character, scene) {
  if (!character?.darkSecret) return null;
  if (scene === 'pogodin' && character.darkSecret === 'occult_fascination') return 'Some of what you see below the mansion resembles things you once pursued because they were forbidden, obscure, or beautiful. None of it feels beautiful now.';
  if (scene === 'ambush' && character.darkSecret === 'flashbacks') return 'The present threatens to split around the edges. You force yourself to keep the street in front of you separate from the place your memory is trying to impose over it.';
  if (scene === 'gold_plaque' && character.darkSecret === 'strange_death') return 'For one moment, the three men’s reaction gives you the same cold sensation as the death you have never been able to explain: the certainty that someone else knows more than you do.';
  return null;
}
function familyEcho(character, scene) {
  const family = character?.family;
  const map = {
    independent: {
      gold_plaque: 'You came alone because solitude is not the same thing as loneliness. You know how to enter a room without needing it to validate you.',
      ambush: 'There is no domestic fantasy waiting to rescue you from this. The life you built for yourself is real, chosen, and worth getting back to.',
    },
    chosen_family: {
      gold_plaque: 'Blood has never been the only way you measure family. Several people in this room would understand that instinctively; others never will.',
      ambush: 'Your first thought is not of ancestry but of the people who chose you and whom you chose back.',
    },
    single_fulfilled: {
      gold_plaque: 'You are not waiting for a relationship to begin your real life. The evening is interesting on its own terms, and so are you.',
      ambush: 'The threat clarifies something simple: a fulfilled life can still be stolen, and you have no intention of surrendering yours.',
    },
    committed_no_children: {
      gold_plaque: 'The future you imagine with your partner does not require children to feel complete. That certainty has survived other people’s opinions.',
    },
    community: {
      gold_plaque: 'You are used to rooms held together by networks of women, artists, organizers, colleagues, and friends rather than by formal authority.',
      pogodin: 'Power looks different when you have spent years watching ordinary people organize around institutions that assumed they were powerless.',
    },
    single_parent: {
      ambush: 'Fear arrives with a second edge: someone depends on you getting home.',
    },
  };
  return map[family]?.[scene] || null;
}
function acceptedRelationships(c, seat) {
  return Object.values(c.relationships || {}).filter(r => r?.status === 'accepted' && (r.seats || []).includes(seat));
}
function relationshipEcho(c, seat, scene) {
  const rel = acceptedRelationships(c, seat)[0];
  if (!rel) return null;
  const other = rel.seats.find(x => x !== seat);
  const otherName = c.players?.[other]?.character?.name || 'the other person';
  const type = rel.type;
  if (scene === 'gold_plaque') {
    if (type === 'married') return `${otherName} is more familiar to you than anyone else in the room. You know the private rhythms of their attention well enough to notice when something has unsettled them.`;
    if (type === 'dating' || type === 'engaged') return `You and ${otherName} arrived with a relationship already in motion. Every glance between you carries information the room cannot read.`;
    if (type === 'siblings') return `You have known ${otherName} long enough to recognize the difference between ordinary discomfort and the moment they become truly alert.`;
    if (type === 'close_friends') return `${otherName} is one of the few people whose instincts you trust without demanding an explanation first.`;
  }
  if (scene === 'ambush') {
    if (['married','dating','engaged'].includes(type)) return `When the attack begins, you locate ${otherName} before you locate the shooter. The reflex is older than this investigation.`;
    if (type === 'siblings') return `The old instinct returns immediately: find your sibling, then deal with everything else.`;
    if (type === 'close_friends') return `You know how ${otherName} moves under pressure. That knowledge becomes tactical before either of you says a word.`;
  }
  if (scene === 'pogodin' && ['married','dating','engaged'].includes(type)) return `Whatever waits beneath Pogodin’s house, neither of you can pretend the other is expendable.`;
  return null;
}
function invitationEcho(character) {
  if (!character) return null;
  const occ = character.occupation;
  const map = {
    professor: 'The invitation reached you through the academic and literary world; a Gold Plaque dinner at the Rathaus is exactly the sort of professional obligation that can masquerade as an evening out.',
    writer: 'The German Authors Association invitation is ordinary enough for your profession. The names on the guest list are useful, the ceremony less so.',
    literary_agent: 'You are here because rooms full of writers, publishers, and patrons are part of the job. Half the evening is social ritual; the other half is business pretending not to be business.',
    agent: 'You are here because rooms full of writers, publishers, and patrons are part of the job. Half the evening is social ritual; the other half is business pretending not to be business.',
    bookseller: 'A client and an old literary acquaintance put your name on the guest list. Rare books have a way of making their dealers welcome in cultural rooms that would otherwise ignore them.',
    journalist: 'An acquaintance in publishing secured the invitation. For a journalist, a crowded reception of authors, editors, and public figures is less a dinner than a directory with wine.',
    diplomatic: 'Your professional circle provided the invitation. Cultural receptions are useful places to be seen, and still more useful places to notice who else wants to be seen.',
    legionnaire: 'You are not here for the prize. A professional acquaintance needed another pair of reliable eyes around a prominent guest, which is enough to put you inside the Rathaus in evening dress.',
    stasi: 'A former professional contact produced the invitation. In the new Germany, old networks have not vanished; they have simply learned to call themselves acquaintances.',
    kgb: 'A contact with ties to the cultural circuit acquired your place at the dinner. Public literary events are good cover precisely because almost everyone has a plausible reason to be there.',
    black_marketeer: 'A well-connected acquaintance put your name on the list. A room full of wealthy collectors, publishers, and people accustomed to private arrangements is worth seeing for yourself.'
  };
  return map[occ] || 'An acquaintance placed your name on the guest list. Whatever your profession, you have a plausible reason to be inside the Rathaus tonight.';
}
function partyHistoryEcho(c, seat) {
  const character = c.players?.[seat]?.character;
  if (!character) return null;
  const rel = acceptedRelationships(c, seat)[0];
  if (rel) return null;
  const otherNames = otherSeats(c, seat, true).map(st => c.players?.[st]?.character?.name).filter(Boolean);
  if (!otherNames.length) return null;
  if (otherNames.length === 1) return `If you did not arrive with ${otherNames[0]}, a mutual acquaintance makes the introduction before dinner. The evening gives you enough time to form an impression without forcing intimacy that is not there.`;
  return `You are not all old friends. Mutual acquaintances make the introductions where they are needed. By the time dinner ends, ${otherNames.join(' and ')} are no longer anonymous faces in the crowd.`;
}
function partyFlowEcho(c, seat, scene, beat) {
  const rel = acceptedRelationships(c, seat)[0];
  const others = otherSeats(c, seat, true);
  if (!others.length) return null;
  const other = rel?.seats?.find(x => x !== seat) || others[0];
  const otherName = c.players?.[other]?.character?.name || 'the other person';
  if (scene === 'gold_plaque' && beat === 0) {
    if (rel?.type === 'married') return `You arrived with ${otherName}. The two of you have spent enough evenings in public together to divide a room without discussing it: one conversation, one glance, one quiet check that the other is all right.`;
    if (['dating','engaged'].includes(rel?.type)) return `You and ${otherName} arrive with a private familiarity that makes the formal reception easier to tolerate. When one of you gets trapped in a conversation, the other already knows the look that means rescue me.`;
    if (rel?.type === 'siblings') return `${otherName} has known you too long to be impressed by the evening dress or the chandeliers. The familiarity is useful; the room can remain strange without the two of you having to be strangers inside it.`;
    if (rel?.type === 'close_friends') return `You and ${otherName} settle into the reception as friends do: separating when conversation pulls you apart, finding one another again without needing to plan it.`;
    return `If you did not arrive with ${otherName}, a mutual acquaintance introduces you before dinner. By the time the dance begins, you have had hours—not seconds—to decide whether the other person is interesting, useful, irritating, or some combination of all three.`;
  }
  if (scene === 'gold_plaque' && beat === 1) return `When the three men look toward your part of the room, ${otherName} notices the change too. Whatever else you disagree about, neither of you has to explain that this reaction is wrong.`;
  if (scene === 'gold_plaque' && beat === 2 && rel) return relationshipEcho(c, seat, scene);
  if (scene === 'ambush' && beat === 0 && rel) return relationshipEcho(c, seat, scene);
  if (scene === 'pogodin' && beat === 0 && rel) return relationshipEcho(c, seat, scene);
  return null;
}
function personalizeStory(c, seat, shared) {
  const character = c.players?.[seat]?.character;
  if (!character || !shared) return shared;
  const text = Array.isArray(shared.text) ? [...shared.text] : [];
  const flow = partyFlowEcho(c, seat, c.current.scene, c.current.beat);
  if (flow) text.splice(Math.min(1, text.length), 0, flow);
  const personal = [];
  const beat = Number(c.current.beat || 0);
  if (c.current.scene === 'gold_plaque' && beat === 0) personal.push(invitationEcho(character));
  personal.push(occupationEcho(character, c.current.scene), familyEcho(character, c.current.scene));
  if (c.current.scene !== 'gold_plaque' || beat >= 1) personal.push(magdaEcho(character, c.current.scene));
  if (c.current.scene !== 'gold_plaque' || beat >= 1) personal.push(darkSecretEcho(character, c.current.scene));
  if (c.players?.[seat]?.entry?.pending) personal.unshift(c.players[seat].entry.text);
  return { ...shared, text, personal: personal.filter(Boolean) };
}
function freeRoamCharacterEcho(character, location) {
  if (!character) return null;
  const occ = character.occupation;
  if (location === 'records' && ['stasi','kgb','diplomatic','journalist'].includes(occ)) return 'Your professional history changes what you notice first: not the file itself, but who controls access to it, who is afraid of being blamed, and where the bureaucracy has become porous.';
  if (location === 'mantra' && ['bookseller','writer','professor'].includes(occ)) return 'The language is strange, but not entirely foreign to you. You recognize enough references to separate deliberate obscurity from genuine tradition.';
  if (location === 'slavic' && ['stasi','kgb','journalist','black_marketeer'].includes(occ)) return 'The public organization and the private network do not line up. Your background makes the gap easier to see.';
  if ((location === 'hamburg_apartment' || location === 'berlin_apartment') && ['journalist','stasi','kgb'].includes(occ)) return 'You search less like a visitor than someone reconstructing another person’s habits: what is missing, what is staged, and what was meant to survive an unexpected absence.';
  if (character.origin?.country === 'germany' && /East Berlin|Saxony|Thuringia|Mecklenburg|Saxony-Anhalt|Brandenburg/.test(character.origin?.region || '') && location === 'records') return 'The basement bureaucracy is familiar in a way you do not enjoy. Reunification changed the letterhead faster than it changed the habits.';
  if (character.family === 'community' && location === 'mantra') return 'You recognize the social architecture immediately: informal expertise, people introducing people, knowledge moving laterally rather than waiting for permission from an institution.';
  if (character.family === 'independent' && location === 'berlin_apartment') return 'An empty room does not automatically read as tragic to you. What bothers you is not solitude but interruption: the signs that Magda did not leave on her own terms.';
  if (character.family === 'chosen_family' && location === 'slavic') return 'You know the difference between community and hierarchy. Whatever binds the late-night group here, it is not simple fellowship.';
  return null;
}

function sharedStoryText(c) {
  const s = c.current.scene, b = c.current.beat;
  if (s === 'gold_plaque') {
    if (b === 0) return {
      kicker: 'Hamburg Rathaus · 14 September 1991 · 8:00 PM',
      title: 'The Gold Plaque',
      context: 'For the moment, this is only a formal evening in a newly reunified Germany: speeches, professional obligations, expensive clothes, and people pretending not to be bored.',
      speaker: { name: 'A Rathaus steward', line: 'The ballroom is open. Dinner will begin shortly.' },
      text: [
        'Rain darkens the stone outside Hamburg’s Rathaus and follows the guests inside as damp wool and shining umbrellas. The German Authors Association has filled the lobby with writers, publishers, academics, patrons, officials, and the people whose work brings them close to such circles without ever making them entirely part of them.',
        'At eight, the crowd is guided beneath a domed ceiling and crystal chandeliers. White silk covers the oak tables. Waiters move through the hall with salmon pâté and roast venison, then apple tart and sorbet. Conversation starts cautiously, loosens with wine, and eventually becomes louder than the speeches.',
        'Karl Dietmar gives the keynote. A nearly unknown poet named Leon Schütz receives the Gold Plaque to courteous applause. Nothing sinister happens. That matters. For a while, the worst plausible mistake is saying the wrong thing to the wrong editor.',
        'After dinner, the ceremony dissolves into smaller rooms and a dance. A waitress flirts with anyone who encourages her. A manager is drunk enough to stop pretending otherwise. A political argument near the doors has attracted an audience. There is time to talk, observe, and learn the people around you before anything gives you a reason to distrust the room.'
      ], art: null
    };
    if (b === 1) return {
      kicker: 'Hamburg Rathaus · Near midnight',
      title: 'Four Late Arrivals',
      context: 'The party has begun to empty when Magda Orlova arrives with three middle-aged men in formal evening clothes and is shown to a table near yours.',
      speaker: { name: 'A nearby guest', line: 'A little late for the prize, aren’t they?' },
      text: [
        'The woman is familiar first. Dark hair, a full-length gown, a short white cape handed to a steward—and then the face resolves into Magda Orlova. Whatever place she occupies in your past, seeing her here should be ordinary enough.',
        'It is the men who make it otherwise. One looks exhausted beyond the excuse of a late evening. If you know Berlin’s artistic circles, he resembles Filip Kramer, a painter whose talent is usually mentioned in the same breath as heroin, occult rumors, and stories people repeat more quietly than they need to.',
        'One of the men looks toward you. The other two follow. Conversation at their table stops. A hand reaches for a glass and misses. Color drains from a face. Nobody points, nobody calls your name, yet all three react with the unmistakable shock of people confronted by something they believed existed somewhere else.',
        'Magda follows their gaze to you. She looks confused, then concerned. A low, urgent exchange begins at the table. You have only a short window in which to decide whether to approach, watch, identify, or simply let the four of them show you what they are afraid of.'
      ], art: null
    };
    return {
      kicker: 'Hamburg Rathaus · After midnight',
      title: 'Magda Orlova',
      context: 'The three men have left with apologies too hurried to be convincing. Magda remains behind, visibly unsettled by their reaction and unexpectedly relieved to see you.',
      speaker: { name: 'Magda Orlova', line: 'I thought coming back to Hamburg would help. It hasn’t.' },
      text: [
        'She comes to you rather than asking you to cross the room. Up close, the change is harder to excuse as bad light. Magda seems smaller than memory, prematurely aged, and exhausted in a way that makes every movement look deliberate. Her perfume is sweet, strong, and almost medicinal.',
        'She removes her gloves to greet each of you. The contact is brief. Even when a handshake is avoided, she finds some ordinary gesture—a hand at an elbow, fingers against a sleeve—as though physical reassurance matters to her tonight. Then the gloves go back on.',
        'For a minute the conversation behaves normally. She asks about work, mutual acquaintances, the absurdity of formal dinners. Then her attention drifts toward the doorway used by the three men. She admits she has barely slept since returning to Berlin. The same dream comes every night. She came back to Hamburg hoping distance would stop it.',
        'The admission leaves her embarrassed and frightened at once. She has not yet described the dream, and she has not explained why the three men looked at you as though they knew you. There is time for one line of conversation to become the important one.'
      ], art: null
    };
  }
  if (s === 'ambush') {
    if (b === 0) return {
      kicker: 'Berlin · Night', title: 'The Russians Strike',
      context: 'Opened mail, inexplicable inquiries, and a metallic Dodge van have turned coincidence into a pattern. Tonight the pattern stops observing you.',
      speaker: null,
      text: [
        'The street is wet enough to double every light. The Dodge appears at the far end, slows, and keeps slowing. Its plates are obscured by grime applied a little too carefully to be accidental.',
        'The side door opens before the van has fully settled. The men who step out do not posture, shout, or demand anything. Their silence is practiced. Their attention moves between exits, hands, and bodies with the efficiency of people who planned the first seconds before arriving.',
        'This is the instant before violence becomes inevitable. There is still room to choose what you protect first: yourself, someone beside you, information, distance, or the chance to identify who sent them.'
      ], art: '/media/art/scenes/ch01_medical_police_research_collage.webp'
    };
    return {
      kicker: 'Berlin · Moments later', title: 'A Bad Plan Coming Apart',
      context: 'The ambush has failed to remain clean. That does not mean it is over.',
      speaker: { name: 'One of the attackers', line: 'Move. Now.' },
      text: [
        'A parked car has lost a window. Someone is shouting from an apartment above. The Dodge is still running. The attackers are already deciding whether completing the job is worth being seen doing it.',
        'Your first reactions have created the next problem. Whoever moved to cover has a route. Whoever stayed exposed needs one. Whoever tried to identify the attackers now has details worth surviving long enough to remember.',
        'The men are not fanatics. They will break contact if the operation becomes too expensive. The question is whether you let them leave on their terms—or force them to leave something useful behind.'
      ], art: '/media/art/scenes/ch01_medical_police_research_collage.webp'
    };
  }
  if (s === 'pogodin') {
    if (b === 0) return {
      kicker: 'Berlin · Pogodin estate', title: "Pogodin’s Mansion",
      context: 'The evidence has finally converged on Sasha Pogodin’s estate. Getting inside is not the same thing as understanding what waits there.',
      speaker: null,
      text: [
        'The residence sits behind controlled approaches, security lighting, walls, dogs, and men whose posture makes the word bodyguard feel too polite. Expensive windows glow against the dark. Nothing about the exterior needs the occult to be threatening.',
        'You have followed too many separate threads here: surveillance, the Slavic Association, Magda’s fear, the three Russians, and a ritual theory that promises an answer precisely because you do not yet understand its cost.',
        'Before crossing the property line, you have one advantage the people inside do not: they do not know exactly which version of you is coming. Quiet, patient, official, deceptive, reckless—each approach creates a different house.'
      ], art: '/media/art/scenes/ch01_pogodin_mansion_collage.webp'
    };
    if (b === 1) return {
      kicker: 'Inside the estate', title: 'Below the Respectable Rooms',
      context: 'Once you pass the rooms built for guests, the mansion stops pretending to be a home.',
      speaker: { name: 'A voice beyond the next door', line: 'They are ready downstairs.' },
      text: [
        'Soundproofed doors interrupt the expensive domestic architecture. The air grows warmer as you descend. Symbols are worked into stone and wood with too much precision to be decoration and too little concern for beauty to be theater.',
        'Then you find the prisoners. Their existence changes the moral shape of the problem immediately. Whatever the ritual is supposed to accomplish, this place has already required suffering before you arrived.',
        'Anton, Sasha, and Filip are somewhere ahead. So is the rite you believe may turn a curse back toward its source. Moving deeper now means deciding what matters when evidence, survival, and other people’s lives stop pointing in the same direction.'
      ], art: '/media/art/scenes/ch01_pogodin_ritual_collage.webp'
    };
    return {
      kicker: 'Point of no return', title: 'The Third Circle',
      context: 'The three Russians are finally inside the geometry. The theory can be tested. The prisoners are still here. Nobody gets to call the next choice abstract.',
      speaker: null,
      text: [
        'Anton, Sasha, and Filip no longer look like distant names in a file. They are frightened men trapped inside a room built to make fear useful. Whatever they have done, whatever they intended for you, the ritual asks you to make their terror part of the mechanism.',
        'The words are ready. The geometry is ready. Your evidence is incomplete. The people in the cells are still alive. Every choice that brought you underground now competes for priority at the same time.',
        'There is no neutral version of what happens next. Completing the rite, breaking it, delaying it for the prisoners, or walking away will shape everything that follows.'
      ], art: '/media/art/scenes/ch01_pogodin_ritual_collage.webp'
    };
  }
  return { kicker: 'The Black Madonna', title: 'Waiting', context:'For a moment, nothing moves except what has already been set in motion.', speaker:null, text: ['There is nothing to do yet but listen to the silence and wait for it to break.'], art: null };
}
function lockChoices(c, seat) {
  const s = c.current.scene, b = c.current.beat;
  if (storyResolutionReady(c)) return [];
  if (s === 'gold_plaque' && b === 0) return [
    { id: 'mingle', label: 'Mingle and read the room', move: 'observe_situation' },
    { id: 'stay_together', label: c.testMode ? 'Keep to the edge and observe' : 'Stay close to the others', move: null },
    { id: 'work_room', label: 'Use your professional contacts', move: 'influence_other' },
    { id: 'watch_exits', label: 'Watch the entrances and exits', move: 'observe_situation' },
  ];
  if (s === 'gold_plaque' && b === 1) return [
    { id: 'approach_magda', label: 'Move toward Magda before the moment passes', move: null },
    { id: 'watch_russians', label: 'Watch the three men and their reaction', move: 'observe_situation' },
    { id: 'identify_filip', label: 'Try to place the exhausted-looking man', move: 'investigate' },
    { id: 'hang_back', label: 'Stay back and read the exchange', move: 'read_person' },
  ];
  if (s === 'gold_plaque' && b === 2) return [
    { id: 'ask_nightmares', label: 'Ask Magda what happens in the dream', move: 'read_person' },
    { id: 'ask_men', label: 'Ask who the three men were', move: 'read_person' },
    { id: 'reassure', label: 'Tell her she looks ill and offer to help', move: 'influence_other' },
    { id: 'follow_russians', label: c.testMode ? 'Follow the three men before they disappear' : 'Leave Magda with the others and follow the three men', move: 'employ_stealth' },
  ];
  if (s === 'ambush') return b === 0 ? [
    { id: 'cover', label: 'Get to cover and assess the threat', move: 'act_under_pressure' },
    { id: 'protect', label: c.testMode ? 'Protect your position and keep moving' : 'Protect someone else', move: 'act_under_pressure' },
    { id: 'observe', label: 'Find the attackers and the cleanest exit', move: 'observe_situation' },
    { id: 'return_fire', label: 'Return fire', move: 'engage_in_combat' },
    { id: 'rush_van', label: 'Rush the van before they can reposition', move: 'act_under_pressure' },
  ] : [
    { id: 'escape', label: c.testMode ? 'Break contact and get out' : 'Break contact and get everyone out', move: 'act_under_pressure' },
    { id: 'suppress', label: c.testMode ? 'Keep them pinned while you move' : 'Keep them pinned while the others move', move: 'engage_in_combat' },
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
function actionActors(c, actions, id) {
  return Object.entries(actions || {}).filter(([_,a]) => a?.id === id).map(([seat]) => c.players?.[seat]?.character?.name || `Seat ${seat}`);
}
function namesPhrase(names) {
  const a=(names||[]).filter(Boolean); if(!a.length)return''; if(a.length===1)return a[0]; if(a.length===2)return `${a[0]} and ${a[1]}`; return `${a.slice(0,-1).join(', ')}, and ${a[a.length-1]}`;
}
function resolveJoint(c, actions) {
  const s = c.current.scene, b = c.current.beat;
  const participants = (c.storyLock.participants || Object.keys(actions)).filter(x => actions[x]);
  const ids = participants.map(x => actions[x]?.id).filter(Boolean);
  const solo = !!c.testMode && participants.length === 1;
  const has = id => ids.includes(id);
  const actors = id => namesPhrase(actionActors(c, actions, id));
  const text = [];
  if (s === 'gold_plaque') {
    if (b === 0) {
      const handled=new Set();
      if (!solo && has('mingle') && has('watch_exits')) {
        text.push(`${actors('mingle')} let the reception carry them from table to table while ${actors('watch_exits')} stay closer to the room’s edges. The split is useful rather than isolating: one side of the group learns names and tempers; the other learns the rhythm of doors, staff, and departures. When you cross paths again, there is already something concrete to exchange.`);
        handled.add('mingle'); handled.add('watch_exits');
      } else if (!solo && has('work_room') && has('stay_together')) {
        text.push(`${actors('work_room')} turn professional introductions into a quiet map of the room. ${actors('stay_together')} remain close enough to catch the useful names between conversations, and the exchange begins to feel less like strangers sharing a table and more like people learning how to work beside one another.`);
        handled.add('work_room'); handled.add('stay_together');
      } else if (!solo && has('mingle') && has('stay_together')) {
        text.push(`${actors('mingle')} move easily into the crowd, drawing conversation after them. ${actors('stay_together')} become the point they return to between introductions. By the second or third reunion, the small ritual has become natural: separate, notice something, find one another again.`);
        handled.add('mingle'); handled.add('stay_together');
      }
      if (has('mingle')&&!handled.has('mingle')) text.push(`${solo?'You':actors('mingle')} circulate instead of waiting for the evening to become important. Editors avoid authors they owe, a revolutionary turns reunification into an argument, a waitress enjoys the freedom to be scandalous, and a manager steadily loses his battle with the wine. The room stops being scenery.`);
      if (has('work_room')&&!handled.has('work_room')) text.push(`${solo?'You':actors('work_room')} make professional conversation do useful work. Names, affiliations, and reputations begin attaching themselves to faces. Nothing discovered is sinister; it simply gives you people to recognize later.`);
      if (has('watch_exits')&&!handled.has('watch_exits')) text.push(`${solo?'You':actors('watch_exits')} keep an eye on the entrances long enough to learn the evening’s rhythm: guests leaving in clusters, staff relaxing after the formal program, coats beginning to disappear from the cloakroom. There is no reason yet to expect danger.`);
      if (has('stay_together')&&!handled.has('stay_together')) text.push(solo ? 'You stay near the edge of the social current and let the room come to you. It is a quieter way to learn who seeks attention and who avoids it.' : `${actors('stay_together')} spend enough of the evening near one another that moving together begins to feel natural. You learn small things: who interrupts, who listens, who notices a change in tone before anyone says why.`);
      text.push('By the time the dance begins, the Rathaus has done what a good party is supposed to do: it has become familiar. That is why four people arriving near midnight feel like an interruption rather than another entrance.');
    } else if (b === 1) {
      const handled=new Set();
      if (!solo && has('approach_magda') && has('watch_russians')) {
        text.push(`${actors('approach_magda')} start toward Magda. ${actors('watch_russians')} do not follow; they keep their attention on the three men instead. For a few seconds the group sees both halves of the same exchange. Magda looks confused by the sudden tension. The men look frightened by you.`);
        text.push(`As ${actors('approach_magda')} close the distance, one of the men bends toward Magda and speaks too low to hear. ${actors('watch_russians')} catch the rest: a missed grip on a glass, a handkerchief pressed to a suddenly pale face, eyes that keep returning to your side of the room and snapping away.`);
        handled.add('approach_magda'); handled.add('watch_russians');
      } else if (!solo && has('approach_magda') && has('identify_filip')) {
        text.push(`${actors('approach_magda')} move toward Magda while ${actors('identify_filip')} search memory for the exhausted man’s face. The name arrives before you reach the table: Filip Kramer—West Berlin galleries, addiction, and occult gossip. Quietly sharing the recognition makes Magda’s company feel less accidental before she has said a word.`);
        handled.add('approach_magda'); handled.add('identify_filip');
      } else if (!solo && has('identify_filip') && has('watch_russians')) {
        text.push(`${actors('identify_filip')} put a name to the tired man—Filip Kramer—while ${actors('watch_russians')} watch what the name cannot explain. Kramer is not merely uncomfortable. Neither are his companions. The three react to your presence with a physical fear that looks much older than this evening.`);
        handled.add('identify_filip'); handled.add('watch_russians');
      } else if (!solo && has('approach_magda') && has('hang_back')) {
        text.push(`${actors('approach_magda')} start across the room. ${actors('hang_back')} stay where they are and watch the table receive that decision. Magda’s face brightens with recognition; the men’s expressions tighten. The difference is immediate enough that neither half of the group needs to explain it later.`);
        handled.add('approach_magda'); handled.add('hang_back');
      }
      if (has('watch_russians')&&!handled.has('watch_russians')) text.push(`${actors('watch_russians')} watch the three men instead of Magda. Their fear is physical—dry mouths, missed grips, a handkerchief produced for a face that has gone suddenly pale. They are trying to hide recognition without ever admitting they recognize anyone.`);
      if (has('identify_filip')&&!handled.has('identify_filip')) text.push(`${actors('identify_filip')} place the exhausted-looking man: Filip Kramer. The name carries West Berlin galleries, addiction, and occult gossip. Recognition explains who he is. It does nothing to explain why he looks at you as though memory itself has become a threat.`);
      if (has('approach_magda')&&!handled.has('approach_magda')) text.push(`${actors('approach_magda')} begin moving toward Magda. She notices and starts to rise, but one of the men catches her attention and speaks urgently into the space between them.`);
      if (has('hang_back')&&!handled.has('hang_back')) text.push(`${actors('hang_back')} stay out of the exchange and let body language do the talking. Magda is confused by the men. The men are frightened by you. Whatever they are whispering, she is not the person controlling the conversation.`);
      text.push('The whispered discussion breaks off. The three men offer polite goodbyes too quickly to sound casual and leave together. Magda watches them go for a long second. When she turns back, the anxiety in her face gives way to something simpler: relief at seeing familiar people. This time she crosses the room herself.');
    } else {
      const handled=new Set();
      if (!solo && has('ask_nightmares') && has('reassure')) {
        text.push(`${actors('reassure')} notice how close Magda is to retreating from the conversation and soften it before ${actors('ask_nightmares')} ask for details. The order matters. She accepts the concern first, then looks down at her gloved hands.`);
        text.push('“I’m a child in it,” she says at last. The rest comes in fragments: punishment, a locked darkness, something moving where she cannot see it, and pain so complete that everything after it becomes confused. When she stops, she seems embarrassed by how badly the memory has shaken her.');
        handled.add('ask_nightmares'); handled.add('reassure');
      } else if (!solo && has('ask_men') && has('follow_russians')) {
        text.push(`${actors('ask_men')} stay with Magda and ask who the three men were while ${actors('follow_russians')} slip away toward the cloakroom. The conversation divides cleanly instead of stopping: one part of the group keeps Magda talking; the other keeps the departing men in sight.`);
        text.push(`Magda supplies the names—Anton Mahler, Aleksandr “Sasha” Pogodin, and Filip Kramer—and says they were friends in East Germany when they were young. Meanwhile, ${actors('follow_russians')} discover that the men are not lingering outside. They leave with the speed of people who decided together that remaining near you was unsafe.`);
        handled.add('ask_men'); handled.add('follow_russians');
      } else if (!solo && has('ask_nightmares') && has('ask_men')) {
        text.push(`${actors('ask_men')} ask first about the men. Magda names Anton Mahler, Sasha Pogodin, and Filip Kramer, old friends from East Germany drawn back into her life after the Wall fell. When ${actors('ask_nightmares')} ask whether they have anything to do with her sleeplessness, the social explanation finally gives way to the thing she is actually afraid of.`);
        text.push('She describes herself as a child in the dream, punished and shut in darkness. Something moves nearby. Then there is pain, and after the pain only broken impressions. Speaking it aloud leaves her ghostly pale.');
        handled.add('ask_nightmares'); handled.add('ask_men');
      } else if (!solo && has('reassure') && has('ask_men')) {
        text.push(`${actors('reassure')} tell Magda plainly that she looks ill. The concern lands before ${actors('ask_men')} ask about the men who just left, so her answer feels less like an interrogation and more like an attempt to explain why the evening has frightened her.`);
        text.push('She names Anton Mahler, Sasha Pogodin, and Filip Kramer. They were friends in East Germany when they were young. Filip contacted her after the Wall fell, and the old circle gradually closed around her again. She admits, almost in the same breath, that returning to Berlin was when the nightmares began.');
        handled.add('reassure'); handled.add('ask_men');
      }
      if (has('ask_nightmares')&&!handled.has('ask_nightmares')) text.push(`${actors('ask_nightmares')} ask Magda to stop speaking around the dream and describe it. She goes still. When she finally answers, she remembers being a child, locked away for disobedience, darkness moving nearby, and pain so complete that everything after it becomes fragments. The telling leaves her pale and visibly shaking.`);
      if (has('ask_men')&&!handled.has('ask_men')) text.push(`${actors('ask_men')} ask who the men were. Magda names Anton Mahler, Aleksandr “Sasha” Pogodin, and Filip Kramer. They were close in East Germany when they were young. She had not seen the three together for years; Filip contacted her again after the Wall fell, and through him the old circle began closing around her again.`);
      if (has('reassure')&&!handled.has('reassure')) text.push(`${actors('reassure')} move the conversation away from questioning and toward concern. Magda admits she returned from Berlin because she hoped Hamburg would let her sleep. She has considered doctors. What frightens her is not that they will find something wrong, but that they will insist nothing is wrong at all.`);
      if (has('follow_russians')&&!handled.has('follow_russians')) text.push(`${actors('follow_russians')} leave before the men can disappear into the city. They do not linger at the cloakroom. Their departure has the efficiency of people who decided together that remaining near you was unsafe. They are gone before a clean confrontation becomes possible, but there is no mistaking the urgency.`);
      const everyoneFollows=ids.length>0&&ids.every(id=>id==='follow_russians');
      if (!everyoneFollows && !has('ask_nightmares')) text.push('The subject of sleep returns before the conversation ends even without a direct question. Magda cannot keep it out of ordinary talk. She admits that the same nightmare has followed her since Berlin and that she is frightened of what happens when she closes her eyes.');
      if (!everyoneFollows && !has('ask_men')) text.push('She also gives you the names of the men almost as an apology for their behavior: Anton, Sasha, and Filip—friends from her youth whose renewed presence in her life has brought more unease than comfort.');
      if (everyoneFollows) text.push('Following the men means giving up the rest of the conversation with Magda. By the time you return to the Rathaus, she has already gone. The trade is real: you keep the departing men in sight for a little longer, but whatever Magda might have told you tonight will have to be recovered another way.');
      else text.push('After a short while Magda rises unsteadily and says she should go. Offers of company or a ride are met with genuine gratitude and firm refusal. The party ends without a revelation large enough to explain what happened. It leaves only smaller facts that refuse to fit together—and the sense that the evening did not end when you walked out of the Rathaus.');
    }
  } else if (s === 'ambush') {
    if (b === 0) {
      if (has('cover')) text.push(`${solo?'You':actors('cover')} move for cover before trying to understand everything at once. The decision trades information for survival and forces the attackers to adjust their angles.`);
      if (has('protect')) text.push(solo ? 'You keep moving rather than letting the attackers pin you in place. Survival becomes a problem of distance and timing.' : `${actors('protect')} move toward someone else instead of taking the cleanest route alone. The choice costs distance but prevents the attackers from isolating anyone.`);
      if (has('observe')) text.push(`${solo?'You':actors('observe')} look past the first threat long enough to identify the useful details: the running Dodge, the shooters’ spacing, and the route they intend to use if the job turns bad.`);
      if (has('return_fire')) text.push(`${solo?'You':actors('return_fire')} answer violence with violence. The attackers expected frightened targets; return fire forces them to behave like men who can be hurt.`);
      if (has('rush_van')) text.push(`${solo?'You':actors('rush_van')} close distance on the Dodge before the crew can reposition. For several seconds the attackers have to choose between the job and protecting their exit.`);
      text.push('The opening exchange ends without giving anyone control. A window is broken. Someone above the street is shouting. The men by the van are already recalculating.');
    } else {
      if (has('escape')) text.push(`${solo?'You':actors('escape')} choose survival over a clean answer and break the geometry of the ambush. The attackers cannot keep a firing solution without exposing themselves to witnesses.`);
      if (has('suppress')) text.push(`${solo?'You':actors('suppress')} keep pressure on the attackers long enough to create movement where there was none. They stop advancing and begin thinking about the van.`);
      if (has('disable_van')) text.push(`${solo?'You':actors('disable_van')} go after the vehicle rather than the men. Even partial damage is enough to make their retreat louder, slower, and less controlled than planned.`);
      if (has('take_prisoner')) text.push(`${solo?'You':actors('take_prisoner')} try to turn one attacker into an answer. The attempt forces the whole group to close ranks around their own man instead of finishing the attack.`);
      text.push('The Dodge finally tears away through wet traffic. What remains is brass, damaged pavement, witnesses who saw too little, and one certainty: the people behind the surveillance have moved from curiosity to attempted murder.');
    }
  } else if (s === 'pogodin') {
    if (b === 0) {
      if (has('surveil')) text.push(`${actors('surveil')||'You'} spend time learning the estate before asking it to reveal anything. Guard changes, blind spots, and routines turn wealth into a pattern.`);
      if (has('sneak')) text.push(`${actors('sneak')||'You'} choose the quiet way in, using the estate’s size against the people paid to control it.`);
      if (has('bluff')) text.push(`${actors('bluff')||'You'} approach through the front of the problem with a story prepared. Confidence buys time, but every second inside the cover story increases the price of being discovered.`);
      if (has('wait')) text.push(`${actors('wait')||'You'} let the Inner Circle settle before moving. Patience reduces traffic in the halls and increases the chance that everyone important is already below.`);
      text.push('However you enter, the public mansion eventually gives way to controlled doors and spaces not meant for ordinary guests. The house has admitted you without becoming safe.');
    } else if (b === 1) {
      if (has('rescue')) text.push(`${actors('rescue')||'You'} stop treating the prisoners as background to the investigation. Helping them costs time and makes silence harder, but it also prevents the ritual from remaining an intellectual problem.`);
      if (has('temple')) text.push(`${actors('temple')||'You'} push toward the ritual space before the house can fully react. Symbols, heat, and voices become stronger as the domestic architecture falls away.`);
      if (has('chaos')) text.push(`${actors('chaos')||'You'} create trouble above to pull attention away from below. The diversion works well enough to make the guards uncertain which emergency is the real one.`);
      if (has('police')) text.push(`${actors('police')||'You'} try to make the outside world matter. Calls, names, and authority create pressure, but the estate has spent years learning how to survive ordinary scrutiny.`);
      text.push('Every route converges on the same fact: Anton, Sasha, and Filip are close, and the rite you came to stop—or use—is already prepared.');
    } else {
      if (has('perform_ritual')) text.push(`${actors('perform_ritual')} complete the rite. The final words do not send a curse neatly back toward its source. The geometry opens instead, becoming a depth the basement cannot physically contain. Three shapes approach from somewhere beyond it.`);
      if (has('rescue_first')) text.push(`${actors('rescue_first')} refuse to let the prisoners become acceptable losses. The ritual loses the clean timing its designers expected, but people who would have been consumed by it are moved out of reach.`);
      if (has('destroy')) text.push(`${actors('destroy')} attack the structure of the rite itself—symbols, materials, sequence—turning certainty into interruption.`);
      if (has('withdraw')) text.push(`${actors('withdraw')} refuse the promise that one more step will make everything comprehensible. Leaving does not solve the problem, but it denies the room the decision it was built to extract from you.`);
      if (has('perform_ritual')) text.push('When the distortion collapses, the Russians are gone. The people who completed the rite are not cured. Something has touched them, identified them, and left a mark that feels less like a wound than a designation.');
      else text.push('The rite does not resolve cleanly. Whatever was supposed to happen remains unfinished, and the three Russians are already moving beyond the reach of this room.');
    }
  }
  return text;
}
function resolutionPresentation(c, seat, lr) {
  if (!lr) return null;
  const scene=lr.scene, beat=Number(lr.beat||0);
  const titles = {
    gold_plaque: ['The Evening Finds Its Shape','They Know You','What Magda Remembers'],
    ambush: ['The First Seconds','The Van Leaves'],
    pogodin: ['Inside the Perimeter','The House Beneath the House','The Choice Becomes Real'],
  };
  const contexts = {
    gold_plaque: ['The reception settles around what you did, and the evening keeps moving.','The late arrivals react, and the room cannot return to what it was before they entered.','Magda answers as far as she can. When the conversation ends, what remains is less an explanation than a set of facts that refuse to sit comfortably together.'],
    ambush: ['The first seconds close behind you. The street is different now.','The attack breaks apart and leaves evidence, injuries, and intent behind.'],
    pogodin: ['The estate reveals itself according to the way you entered it.','The hidden purpose of the estate becomes immediate and human.','The final decision changes what follows.'],
  };
  return {
    kicker:({gold_plaque:['Hamburg Rathaus · Later','Hamburg Rathaus · Near midnight','Hamburg Rathaus · After midnight'],ambush:['Berlin · Night','Berlin · Moments later'],pogodin:["Pogodin Estate · Night","Beneath Pogodin’s Mansion","Beneath Pogodin’s Mansion"]}[scene]?.[beat] || 'A moment later'),
    title:titles[scene]?.[beat] || 'The Consequence',
    context:contexts[scene]?.[beat] || 'What follows cannot be taken back.',
    speaker:null,
    text:Array.isArray(lr.text)?lr.text:[],
    actions:Object.fromEntries((lr.participants||[]).map(st=>[st,lr.actions?.[st]||null])),
    acknowledged:{...blankReady(),...(lr.acknowledged||{})},
  };
}
function publicView(c, uid, online = {}) {
  const seat = seatFor(c, uid);
  if (!seat) return null;
  const own = c.players[seat];
  const other = primaryCounterpart(c, seat);
  const partner = other ? c.players[other] : null;
  const companions = otherSeats(c, seat).map(st => ({
    seat: st,
    characterId: c.players[st]?.characterId || null,
    character: c.players[st]?.character ? { name:c.players[st].character.name, occupation:c.players[st].character.occupation, occupationName:c.players[st].character.occupationName } : null,
    online: !!online[st], lastSeen:c.players[st]?.lastSeen || null,
  }));
  const participant = (c.storyLock.participants || []).includes(seat);
  const resolutionPending = participant && storyResolutionReady(c) && (c.storyLock.lastResolution?.participants || []).includes(seat);
  const relationshipList = Object.values(c.relationships || {}).filter(r => (r?.seats || []).includes(seat)).map(r => ({ ...r, otherSeat:(r.seats || []).find(x => x !== seat) || null }));
  const base = {
    id:c.id, name:c.name, revision:c.revision, savedAt:c.savedAt || c.createdAt || null, saveReason:c.saveReason || 'campaign', phase:c.phase, seat, testMode:!!c.testMode,
    player:{ characterId:own?.characterId || null, character:own?.character || null, entry:own?.entry || null, backgroundEditUsed:!!own?.backgroundEditUsed, backgroundEditAvailable:!!own?.character && !own?.backgroundEditUsed && !c.flags.ambushDone && ['lobby','free_roam'].includes(c.current.mode) },
    partner: partner ? { seat:other, characterId:partner.characterId || null, character:partner.character ? { name:partner.character.name, occupation:partner.character.occupation, occupationName:partner.character.occupationName } : null, online:!!online[other], lastSeen:partner.lastSeen || null } : null,
    companions,
    party:{ occupied:occupiedSeats(c,false), withCharacters:occupiedSeats(c,true), maxSeats:c.testMode?1:3, minimumPrimary:c.testMode?['A']:['A','B'], names:Object.fromEntries(occupiedSeats(c,false).map(st=>[st,c.players?.[st]?.character?.name || `Seat ${st}`])) },
    relationships:relationshipList,
    relationshipTypes:RELATIONSHIP_TYPES,
    current:c.current,
    flags:{ ...c.flags, marked:{ self:!!c.flags.marked[seat], partnerKnown:false }, infection:{ self:!!c.flags.infection[seat] } },
    storyLock:{ active:c.storyLock.active, gate:c.storyLock.gate, ready:c.storyLock.ready, participants:c.storyLock.participants || [], participating:participant, submitted:!!c.storyLock.actions?.[seat], submissions:Object.fromEntries(SEATS.map(st=>[st,!!c.storyLock.actions?.[st]])), turn:c.storyLock.turn?{order:[...(c.storyLock.turn.order||[])],initiative:{...(c.storyLock.turn.initiative||{})},index:Number(c.storyLock.turn.index||0),currentSeat:activeTurnSeat(c),round:Number(c.storyLock.turn.round||1),usedChoices:[...(c.storyLock.turn.usedChoices||[])],lastResponse:c.storyLock.turn.lastResponse||null}:null, resolutionPending, resolutionAcknowledged:!!c.storyLock.lastResolution?.acknowledged?.[seat], resolution:resolutionPending?resolutionPresentation(c,seat,c.storyLock.lastResolution):null },
    freeRoam:{ day:c.freeRoam.day, slots:c.freeRoam.slots[seat], partySlotsUsed:Object.fromEntries(otherSeats(c,seat).map(st=>[st,spentCount(c,st)])), partnerSlotsUsed:other?spentCount(c,other):0, lastResult:c.freeRoam.lastResult[seat] ? { ...c.freeRoam.lastResult[seat], characterEcho:freeRoamCharacterEcho(own?.character,c.freeRoam.lastResult[seat]?.location) } : null, locations:Object.fromEntries(Object.entries(FREE_ROAM_LOCATIONS).map(([id,x])=>[id,{name:x.name,art:x.art,frame:x.frame,actions:Object.fromEntries(Object.entries(x.actions).map(([aid,a])=>[aid,{label:a.label,move:a.move,attribute:a.attribute || (MOVE_MAP[a.move]?.attribute || null)}]))}])) },
    journal:{ shared:c.journal.shared.map(x=>({...x,clue:CLUES[x.clueId]})), private:c.journal.private[seat].map(x=>({...x,clue:CLUES[x.clueId]})) },
    invite:{ canManage:seat==='A'&&!c.testMode, disabledReason:c.testMode?'Single-player admin test campaigns do not accept invitations.':null, seats:{ B:{claimed:!!c.players.B,code:seat==='A'&&!c.testMode&&!c.players.B?(c.invites?.B || null):null}, C:{claimed:!!c.players.C,code:seat==='A'&&!c.testMode&&!c.players.C?(c.invites?.C || null):null} } },
    betaComplete:c.flags.betaComplete,
    capabilities:{ campaignReset:seat==='A', notifications:true, mobileNav:true, adminSinglePlayerTest:!!c.testMode },
  };
  if (c.current.mode === 'story_lock' && participant && !resolutionPending) { base.story = personalizeStory(c,seat,sharedStoryText(c)); base.choices = activeTurnSeat(c)===seat ? availableTurnChoices(c,seat) : []; }
  return base;
}

function sceneLabel(c) {
  const scene = c?.current?.scene || 'setup';
  const labels = { setup:'Party assembly', gold_plaque:'The Gold Plaque', berlin_free_roam:'Berlin — Free Roam', ambush:'The Russians Strike', pogodin:"Pogodin’s Mansion", chapter1_boundary:'Chapter I boundary' };
  return labels[scene] || scene.replace(/_/g,' ');
}
function campaignSummary(c, uid) {
  const seat = seatFor(c, uid);
  if (!seat) return null;
  const names = occupiedSeats(c,false).map(st => c.players?.[st]?.character?.name).filter(Boolean);
  return {
    id:c.id, name:c.name, seat, owner:seat==='A', testMode:!!c.testMode, phase:c.phase, scene:c.current?.scene || 'setup', sceneLabel:sceneLabel(c), beat:Number(c.current?.beat || 0),
    createdAt:c.createdAt || null, savedAt:c.savedAt || c.createdAt || null, saveReason:c.saveReason || 'campaign', revision:Number(c.revision || 0),
    playerNames:names, occupied:occupiedSeats(c,false).length, completedCharacters:occupiedSeats(c,true).length, betaComplete:!!c.flags?.betaComplete,
    sourceCampaignId:c.sourceCampaignId || null, sourceRevision:c.sourceRevision || null,
  };
}
function cloneCampaignState(source, newId, newName) {
  const copy = JSON.parse(JSON.stringify(source));
  copy.id = newId;
  copy.name = String(newName || `${source.name || 'Black Madonna'} — Saved State`).trim().slice(0,80);
  copy.version = 6;
  copy.sourceCampaignId = source.id;
  copy.sourceRevision = Number(source.revision || 0);
  copy.createdAt = Date.now();
  copy.savedAt = Date.now();
  copy.saveReason = 'manual_state_copy';
  copy.revision = 1;
  copy.processedActions = [];
  copy.invites = copy.testMode ? { B:null, C:null } : {
    B: copy.players?.B ? null : randId('').slice(0,10).toUpperCase(),
    C: copy.players?.C ? null : randId('').slice(0,10).toUpperCase(),
  };
  copy.invite = null;
  return ensureCampaignShape(copy);
}

async function safeNotify(env, player, message) {
  if (!player?.contact) return false;
  if (player.method === 'sms') return (await sendSmsMessage(env, player.contact, `The Black Madonna: ${message}`)).ok;
  if (player.method === 'email') return (await sendEmail(env, player.contact, message, 'alert')).ok;
  return false;
}

export class AuthRoom {
  constructor(state, env) { this.state = state; this.env = env; }

  async userByEmail(email) {
    const normalized = normalizeContact('email', email);
    if (!normalized || !validEmail(normalized)) return null;
    const uid = await userIdFor('email', normalized);
    return await this.state.storage.get(`user:${uid}`) || null;
  }

  async ensureBootstrapAdmin() {
    const email = normalizeContact('email', this.env.ADMIN_EMAIL || '');
    const password = String(this.env.ADMIN_PASSWORD || '');
    if (!email || !validEmail(email) || !password) return null;
    const uid = await userIdFor('email', email);
    const marker = await this.state.storage.get('admin-bootstrap-applied');
    let user = await this.state.storage.get(`user:${uid}`);
    let changed = false;
    if (!user) {
      user = {
        uid,
        email,
        role: 'admin',
        disabled: false,
        password: await derivePassword(this.env, password),
        sessionVersion: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        passwordChangedAt: Date.now(),
        lastLoginAt: null,
      };
      changed = true;
    } else {
      if (user.role !== 'admin') { user.role = 'admin'; changed = true; }
      if (!marker || user.password?.algorithm !== PASSWORD_ALGORITHM) {
        user.password = await derivePassword(this.env, password);
        user.passwordChangedAt = Date.now();
        user.sessionVersion = Number(user.sessionVersion || 1) + 1;
        changed = true;
      }
      if (!user.sessionVersion) { user.sessionVersion = 1; changed = true; }
      if (user.disabled) { user.disabled = false; changed = true; }
      if (changed) user.updatedAt = Date.now();
    }
    if (changed) await this.state.storage.put(`user:${uid}`, user);
    if (!marker) await this.state.storage.put('admin-bootstrap-applied', { uid, email, at: Date.now() });
    return user;
  }

  async cleanupLegacyCharacterArtifacts() {
    const markerKey = 'cleanup:v10:catherine-dubois';
    if (await this.state.storage.get(markerKey)) return;
    let removed = 0;
    for (const prefix of ['character:','character-draft:']) {
      const listed = await this.state.storage.list({ prefix });
      for (const [key, rec] of listed) {
        const c = rec?.character || rec?.draft || {};
        const name = String(c.name || `${c.firstName || ''} ${c.lastName || ''}`).trim().replace(/\s+/g,' ').toLowerCase();
        if (name === 'catherine dubois') { await this.state.storage.delete(key); removed++; }
      }
    }
    await this.state.storage.put(markerKey, { at:Date.now(), removed });
  }

  async issueReset(user, origin, issuedBy = 'self', deliver = true) {
    const previousHash = await this.state.storage.get(`reset-current:${user.uid}`);
    if (previousHash) await this.state.storage.delete(`reset:${previousHash}`);
    const token = randomResetToken();
    const tokenHash = base64url(await sha(token));
    const exp = Date.now() + RESET_TTL_MS;
    await this.state.storage.put(`reset:${tokenHash}`, { uid: user.uid, exp, issuedBy, createdAt: Date.now() });
    await this.state.storage.put(`reset-current:${user.uid}`, tokenHash);
    const base = String(origin || '').replace(/\/$/, '');
    const resetUrl = `${base}/?reset=${encodeURIComponent(token)}`;
    let delivery = { ok: false, configured: false, provider: 'manual', error: 'Email delivery is not configured.' };
    if (deliver) delivery = await sendEmail(this.env, user.email, resetUrl, 'reset');
    return { token, resetUrl, exp, delivery };
  }

  async fetch(request) {
    const url = new URL(request.url);
    await this.ensureBootstrapAdmin();
    await this.cleanupLegacyCharacterArtifacts();

    if (url.pathname === '/register') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
      let body; try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request.' }, 400); }
      const email = normalizeContact('email', body.email);
      const password = String(body.password || '');
      if (!email || !validEmail(email)) return json({ error: 'Enter a valid email address.' }, 400);
      if (!validPassword(password)) return json({ error: 'Password must be between 10 and 128 characters.' }, 400);
      const uid = await userIdFor('email', email);
      if (await this.state.storage.get(`user:${uid}`)) return json({ error: 'An account already exists for that email.' }, 409);
      const now = Date.now();
      const user = { uid, email, role: 'player', disabled: false, password: await derivePassword(this.env, password), sessionVersion: 1, createdAt: now, updatedAt: now, passwordChangedAt: now, lastLoginAt: now };
      await this.state.storage.put(`user:${uid}`, user);
      const token = await signUserSession(this.env, user);
      return json({ ok: true, token, user: publicAccount(user) });
    }

    if (url.pathname === '/login') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
      let body; try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request.' }, 400); }
      const email = normalizeContact('email', body.email);
      const password = String(body.password || '');
      if (!email || !validEmail(email) || !password) return json({ error: 'Invalid email or password.' }, 401);
      const user = await this.userByEmail(email);
      if (!user || user.disabled) return json({ error: 'Invalid email or password.' }, 401);
      const now = Date.now();
      if (user.lockUntil && user.lockUntil > now) return json({ error: 'Too many failed attempts. Try again later.' }, 429);
      if (user.password?.algorithm !== PASSWORD_ALGORITHM) return json({ error: 'This beta account uses an older password format. Request a password reset to upgrade it.' }, 409);
      if (!(await verifyPassword(this.env, password, user.password))) {
        user.failedLogins = Number(user.failedLogins || 0) + 1;
        if (user.failedLogins >= 8) { user.lockUntil = now + 15 * 60 * 1000; user.failedLogins = 0; }
        user.updatedAt = now;
        await this.state.storage.put(`user:${user.uid}`, user);
        return json({ error: 'Invalid email or password.' }, 401);
      }
      user.failedLogins = 0; user.lockUntil = null; user.lastLoginAt = now; user.updatedAt = now;
      if (!user.sessionVersion) user.sessionVersion = 1;
      await this.state.storage.put(`user:${user.uid}`, user);
      const token = await signUserSession(this.env, user);
      return json({ ok: true, token, user: publicAccount(user) });
    }

    if (url.pathname === '/session') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
      let body; try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request.' }, 400); }
      const user = await this.state.storage.get(`user:${String(body.uid || '')}`);
      if (!user || user.disabled) return json({ error: 'Session is no longer valid.' }, 401);
      if (Number(body.sv || 0) !== Number(user.sessionVersion || 1)) return json({ error: 'Session is no longer valid.' }, 401);
      return json({ ok: true, user: publicAccount(user) });
    }


    if (url.pathname === '/character-drafts') {
      const uid = String(request.headers.get('x-chagidiel-user') || '');
      if (!uid) return json({ error:'Authentication required.' },401);
      if (request.method === 'GET') {
        const listed = await this.state.storage.list({ prefix:characterDraftPrefix(uid) });
        const drafts = [...listed.values()].map(publicDraftRecord).sort((a,b)=>Number(b.updatedAt||0)-Number(a.updatedAt||0));
        return json({ ok:true, drafts });
      }
      if (request.method === 'POST') {
        let body; try { body = await request.json(); } catch (_) { return json({ error:'Invalid request.' },400); }
        const cleaned = cleanDraftPayload(body.draft);
        if (cleaned.error) return json({ error:cleaned.error },400);
        const listed = await this.state.storage.list({ prefix:characterDraftPrefix(uid) });
        if (listed.size >= 20) return json({ error:'Character draft limit reached (20).' },409);
        const now=Date.now(), id=randId('dr_');
        const rec={ id, ownerUid:uid, draft:cleaned.draft, createdAt:now, updatedAt:now };
        await this.state.storage.put(characterDraftKey(uid,id),rec);
        return json({ ok:true, record:publicDraftRecord(rec) },201);
      }
      return json({ error:'Method not allowed.' },405);
    }
    const draftMatch = url.pathname.match(/^\/character-drafts\/(dr_[a-f0-9]+)$/);
    if (draftMatch) {
      const uid=String(request.headers.get('x-chagidiel-user') || '');
      if (!uid) return json({ error:'Authentication required.' },401);
      const id=draftMatch[1], key=characterDraftKey(uid,id), rec=await this.state.storage.get(key);
      if (!rec) return json({ error:'Character draft not found.' },404);
      if (request.method === 'GET') return json({ ok:true, record:publicDraftRecord(rec) });
      if (request.method === 'PUT') {
        let body; try { body=await request.json(); } catch (_) { return json({ error:'Invalid request.' },400); }
        const cleaned=cleanDraftPayload(body.draft); if (cleaned.error) return json({ error:cleaned.error },400);
        rec.draft=cleaned.draft; rec.updatedAt=Date.now(); await this.state.storage.put(key,rec);
        return json({ ok:true, record:publicDraftRecord(rec) });
      }
      if (request.method === 'DELETE') { await this.state.storage.delete(key); return json({ ok:true, deleted:id }); }
      return json({ error:'Method not allowed.' },405);
    }

    if (url.pathname === '/characters') {
      const uid = String(request.headers.get('x-chagidiel-user') || '');
      if (!uid) return json({ error: 'Authentication required.' }, 401);
      if (request.method === 'GET') {
        const listed = await this.state.storage.list({ prefix: characterStoragePrefix(uid) });
        const characters = [...listed.values()].map(publicCharacterRecord).sort((a,b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
        return json({ ok: true, characters });
      }
      if (request.method === 'POST') {
        let body; try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request.' }, 400); }
        const cleaned = cleanCharacter(body.character);
        if (cleaned.error) return json({ error: cleaned.error }, 400);
        const listed = await this.state.storage.list({ prefix: characterStoragePrefix(uid) });
        if (listed.size >= 20) return json({ error: 'Character library limit reached (20).' }, 409);
        const now = Date.now();
        const id = randId('pc_');
        const rec = { id, ownerUid: uid, character: cleaned.character, createdAt: now, updatedAt: now };
        await this.state.storage.put(characterStorageKey(uid,id), rec);
        if (validDraftId(body.draftId)) await this.state.storage.delete(characterDraftKey(uid,body.draftId));
        return json({ ok: true, record: publicCharacterRecord(rec) }, 201);
      }
      return json({ error: 'Method not allowed.' }, 405);
    }

    const characterMatch = url.pathname.match(/^\/characters\/(pc_[a-f0-9]+)$/);
    if (characterMatch) {
      const uid = String(request.headers.get('x-chagidiel-user') || '');
      if (!uid) return json({ error: 'Authentication required.' }, 401);
      const id = characterMatch[1];
      const key = characterStorageKey(uid,id);
      const rec = await this.state.storage.get(key);
      if (!rec) return json({ error: 'Character not found.' }, 404);
      if (request.method === 'GET') return json({ ok: true, record: publicCharacterRecord(rec) });
      if (request.method === 'PUT') {
        let body; try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request.' }, 400); }
        const cleaned = cleanCharacter(body.character);
        if (cleaned.error) return json({ error: cleaned.error }, 400);
        rec.character = cleaned.character; rec.updatedAt = Date.now();
        await this.state.storage.put(key, rec);
        return json({ ok: true, record: publicCharacterRecord(rec) });
      }
      if (request.method === 'DELETE') {
        await this.state.storage.delete(key);
        return json({ ok: true, deleted: id });
      }
      return json({ error: 'Method not allowed.' }, 405);
    }

    if (url.pathname === '/campaigns') {
      const uid = String(request.headers.get('x-chagidiel-user') || '');
      if (!uid) return json({ error: 'Authentication required.' }, 401);
      const key = campaignMemoryKey(uid);
      const current = await this.state.storage.get(key) || { ids: [], lastId: null, updatedAt: null };
      if (request.method === 'GET') return json({ ok: true, ...current });
      if (request.method === 'POST') {
        let body; try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request.' }, 400); }
        const campaignId = String(body.campaignId || '');
        if (!validCampaignId(campaignId)) return json({ error: 'Invalid campaign id.' }, 400);
        current.ids = [campaignId, ...(current.ids || []).filter(x => x !== campaignId)].slice(0, 30);
        current.lastId = campaignId; current.updatedAt = Date.now();
        await this.state.storage.put(key, current);
        return json({ ok: true, ...current });
      }
      if (request.method === 'DELETE') {
        let body; try { body = await request.json(); } catch (_) { return json({ error:'Invalid request.' },400); }
        const campaignId=String(body.campaignId || '');
        current.ids=(current.ids || []).filter(x=>x!==campaignId);
        if (current.lastId===campaignId) current.lastId=current.ids[0] || null;
        current.updatedAt=Date.now(); await this.state.storage.put(key,current);
        return json({ok:true,...current});
      }
      return json({ error: 'Method not allowed.' }, 405);
    }

    if (url.pathname === '/forgot') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
      let body; try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request.' }, 400); }
      const email = normalizeContact('email', body.email);
      const user = await this.userByEmail(email);
      let delivery = null;
      if (user && !user.disabled) {
        const issued = await this.issueReset(user, request.headers.get('x-chagidiel-origin') || body.origin || '', 'self', true);
        delivery = issued.delivery?.ok ? 'email' : 'admin';
      }
      return json({ ok: true, message: 'If that account exists, a password-reset request has been created.', delivery });
    }

    if (url.pathname === '/reset') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
      let body; try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request.' }, 400); }
      const token = String(body.token || '').trim();
      const password = String(body.password || '');
      if (!token) return json({ error: 'Reset token is missing.' }, 400);
      if (!validPassword(password)) return json({ error: 'Password must be between 10 and 128 characters.' }, 400);
      const tokenHash = base64url(await sha(token));
      const rec = await this.state.storage.get(`reset:${tokenHash}`);
      if (!rec || rec.exp < Date.now()) return json({ error: 'That reset link is invalid or has expired.' }, 400);
      const current = await this.state.storage.get(`reset-current:${rec.uid}`);
      if (current !== tokenHash) return json({ error: 'That reset link has already been replaced.' }, 400);
      const user = await this.state.storage.get(`user:${rec.uid}`);
      if (!user || user.disabled) return json({ error: 'That reset link is no longer valid.' }, 400);
      user.password = await derivePassword(this.env, password);
      user.passwordChangedAt = Date.now();
      user.updatedAt = Date.now();
      user.sessionVersion = Number(user.sessionVersion || 1) + 1;
      user.failedLogins = 0; user.lockUntil = null;
      await this.state.storage.put(`user:${user.uid}`, user);
      await this.state.storage.delete(`reset:${tokenHash}`);
      await this.state.storage.delete(`reset-current:${user.uid}`);
      return json({ ok: true });
    }

    if (url.pathname === '/admin/users') {
      if (request.headers.get('x-chagidiel-admin') !== '1') return json({ error: 'Administrator access required.' }, 403);
      const listed = await this.state.storage.list({ prefix: 'user:' });
      const users = [...listed.values()].map(publicAccount).sort((a, b) => String(a.email).localeCompare(String(b.email)));
      return json({ ok: true, users, emailResetDeliveryConfigured: !!(this.env.RESEND_API_KEY && this.env.RESEND_FROM) });
    }

    if (url.pathname === '/admin/reset') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
      if (request.headers.get('x-chagidiel-admin') !== '1') return json({ error: 'Administrator access required.' }, 403);
      let body; try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request.' }, 400); }
      const uid = String(body.uid || '');
      const user = await this.state.storage.get(`user:${uid}`);
      if (!user || user.disabled) return json({ error: 'Account not found.' }, 404);
      const issued = await this.issueReset(user, request.headers.get('x-chagidiel-origin') || body.origin || '', request.headers.get('x-chagidiel-admin-uid') || 'admin', true);
      return json({
        ok: true,
        user: publicAccount(user),
        resetUrl: issued.resetUrl,
        expiresAt: issued.exp,
        emailed: !!issued.delivery?.ok,
        emailConfigured: issued.delivery?.configured !== false,
        emailError: issued.delivery?.ok ? null : (issued.delivery?.error || null),
      });
    }

    // Legacy one-time-code endpoints are retained for old beta clients, but the new UI uses password accounts.
    if (url.pathname === '/request') {
      let body;
      try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request.' }, 400); }
      const method = body.method === 'sms' ? 'sms' : 'email';
      const contact = normalizeContact(method, body.value);
      if (!contact || (method === 'email' && !validEmail(contact)) || (method === 'sms' && !validPhone(contact))) return json({ error: 'Enter a valid contact address.' }, 400);
      const code = randomCode();
      const hash = base64url(await sha(code));
      await this.state.storage.put(`otp:${method}:${contact}`, { hash, exp: Date.now() + 10 * 60 * 1000, attempts: 0 });
      const result = method === 'sms' ? await sendSmsMessage(this.env, contact, `Your Black Madonna login code is ${code}. It expires in 10 minutes.`) : await sendEmail(this.env, contact, code, 'login');
      if (result?.ok) return json({ ok: true, sent: true, provider: result.provider });
      if (String(this.env.DEV_OTP || '').toLowerCase() === 'true') return json({ ok: true, sent: false, provider: result?.provider || 'local', devCode: code, warning: result?.error || 'Provider delivery failed.' });
      return json({ error: `${method === 'sms' ? 'SMS' : 'Email'} login is not configured yet.`, detail: result?.error || null }, result?.configured === false ? 503 : 502);
    }

    if (url.pathname === '/verify') {
      let body; try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request.' }, 400); }
      const method = body.method === 'sms' ? 'sms' : 'email';
      const contact = normalizeContact(method, body.value);
      const key = `otp:${method}:${contact}`;
      const rec = await this.state.storage.get(key);
      if (!rec || rec.exp < Date.now()) return json({ error: 'That code has expired.' }, 400);
      const hash = base64url(await sha(String(body.code || '').trim()));
      if (hash !== rec.hash) return json({ error: 'Incorrect code.' }, 400);
      await this.state.storage.delete(key);
      const uid = await userIdFor(method, contact);
      const token = await signSession(this.env, { uid, contact, method, role: 'legacy', sv: 0, exp: Date.now() + 24 * 60 * 60 * 1000 });
      return json({ ok: true, token, user: { uid, contact, method, role: 'legacy' }, legacy: true });
    }

    return json({ error: 'Not found.' }, 404);
  }
}

export class CampaignRoom {
  constructor(state, env) {
    this.state = state; this.env = env; this.sockets = new Map();
  }
  async load() { return ensureCampaignShape(await this.state.storage.get('campaign')); }
  async save(c, reason = 'progress') {
    c.revision = Number(c.revision || 0) + 1;
    c.savedAt = Date.now();
    c.saveReason = String(reason || 'progress').slice(0, 80);
    await this.state.storage.put('campaign', c);
    return c;
  }
  presence() {
    const out = { A:false, B:false, C:false };
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
      if (!c) { const b = await request.json(); c = newCampaign(b.id, b.invite, { uid, contact, method }, b.name, b.testMode); c.savedAt = Date.now(); c.saveReason = b.testMode ? 'admin_test_campaign_created' : 'campaign_created'; await this.state.storage.put('campaign', c); }
      return json({ ok: true, state: publicView(c, uid, this.presence()), invite: c.invite });
    }
    if (url.pathname === '/clone-init') {
      let c=await this.load();
      if (c) return json({error:'Destination campaign already exists.'},409);
      let body; try{body=await request.json()}catch(_){return json({error:'Invalid clone payload.'},400)}
      if (!body?.snapshot || !body?.id) return json({error:'Clone payload is incomplete.'},400);
      c=cloneCampaignState(body.snapshot,body.id,body.name); await this.state.storage.put('campaign',c);
      return json({ok:true,state:publicView(c,uid,this.presence())},201);
    }
    let c = await this.load();
    if (!c) return json({ error: 'Campaign does not exist.' }, 404);
    if (url.pathname === '/join') {
      if (c.testMode) return json({ error:'Admin single-player test campaigns do not accept invited players.' },403);
      const b = await request.json();
      let seat = seatFor(c,uid);
      if (!seat) {
        const code=String(b.invite || '').toUpperCase();
        let target=null;
        if (!c.players.B && code && code === String(c.invites?.B || '').toUpperCase()) target='B';
        else if (!c.players.C && code && code === String(c.invites?.C || '').toUpperCase()) target='C';
        if (!target) return json({ error:'Invalid, expired, or already-claimed invite code.' },403);
        c.players[target]=playerRecord({uid,contact,method});
        c.invites[target]=null; seat=target; pushLog(c,'player_joined',seat); await this.save(c,'player_joined');
      }
      this.broadcast(c); return json({ ok:true, seat, state:publicView(c,uid,this.presence()) });
    }
    const seat = seatFor(c,uid);
    if (!seat) return json({ error:'You are not a member of this campaign.' },403);
    c.players[seat].lastSeen=Date.now();
    if (url.pathname === '/summary') return json({ok:true,summary:campaignSummary(c,uid)});
    if (url.pathname === '/rename') {
      if (seat!=='A') return json({error:'Only the campaign owner can rename this campaign.'},403);
      if (request.method!=='POST') return json({error:'Method not allowed.'},405);
      let body={}; try{body=await request.json()}catch(_){}
      const name=String(body.name || '').trim().slice(0,80); if(!name)return json({error:'Enter a campaign name.'},400);
      c.name=name; pushLog(c,'campaign_renamed',seat,{name}); await this.save(c,'campaign_renamed'); this.broadcast(c);
      return json({ok:true,summary:campaignSummary(c,uid),state:publicView(c,uid,this.presence())});
    }
    if (url.pathname === '/clone-source') {
      if (seat!=='A') return json({error:'Only the campaign owner can save a branch copy.'},403);
      return json({ok:true,snapshot:c,members:occupiedSeats(c,false).map(st=>c.players[st]?.uid).filter(Boolean)});
    }
    if (url.pathname === '/delete') {
      if (seat!=='A') return json({error:'Only the campaign owner can delete this campaign.'},403);
      if (request.method!=='DELETE') return json({error:'Method not allowed.'},405);
      const members=occupiedSeats(c,false).map(st=>c.players[st]?.uid).filter(Boolean);
      for (const [,set] of this.sockets) for (const ws of set) { try{ws.send(JSON.stringify({type:'campaign_deleted',campaignId:c.id}));ws.close(1000,'Campaign deleted')}catch(_){} }
      await this.state.storage.deleteAll();
      return json({ok:true,deleted:c.id,members});
    }
    if (url.pathname === '/invite') {
      if (c.testMode) return json({ error:'Invitations are disabled in admin single-player test mode.' },409);
      if (seat !== 'A') return json({ error:'Only Seat A can manage campaign invitations.' },403);
      if (request.method === 'GET') return json({ ok:true, campaignId:c.id, seats:{ B:{claimed:!!c.players.B,invite:c.players.B?null:(c.invites?.B || null)}, C:{claimed:!!c.players.C,invite:c.players.C?null:(c.invites?.C || null)} } });
      if (request.method !== 'POST') return json({ error:'Method not allowed.' },405);
      let body={}; try { body=await request.json(); } catch (_) {}
      const target=String(body.seat || 'B').toUpperCase();
      if (!['B','C'].includes(target)) return json({ error:'Invite seat must be B or C.' },400);
      if (c.players[target]) return json({ error:`Seat ${target} has already been claimed.` },409);
      c.invites[target]=randId('').slice(0,10).toUpperCase();
      pushLog(c,'invite_regenerated',seat,{target}); await this.save(c,'invite_regenerated'); this.broadcast(c);
      return json({ ok:true, campaignId:c.id, seat:target, claimed:false, invite:c.invites[target] });
    }
    if (url.pathname === '/state') {
      c.lastOpenedAt = Date.now();
      await this.save(c, 'browser_load');
      return json({ ok: true, state: publicView(c, uid, this.presence()) });
    }
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
      const others = otherSeats(c,seat);
      if (!Array.isArray(c.processedActions)) c.processedActions = [];
      const clientActionId = String(b.clientActionId || '').slice(0, 120);
      if (clientActionId && c.processedActions.includes(clientActionId)) return json({ ok: true, deduplicated: true, state: publicView(c, uid, this.presence()) });
      if (b.type === 'reset_campaign') {
        if (seat !== 'A') return json({ error:'Only Seat A can reset the campaign.' },403);
        const reset = resetCampaignProgress(c);
        reset.processedActions = clientActionId ? [clientActionId] : [];
        await this.save(reset, 'campaign_reset');
        this.broadcast(reset);
        for (const st of otherSeats(reset, seat)) if (!this.presence()[st]) await safeNotify(this.env, reset.players[st], 'The campaign was reset and has restarted from the beginning with the current protagonists.');
        return json({ ok:true, reset:true, state:publicView(reset, uid, this.presence()) });
      }
      if (b.type === 'set_character' || b.type === 'assign_character' || b.type === 'edit_character') {
        const cleaned = cleanCharacter(b.character);
        if (cleaned.error) return json({ error: cleaned.error }, 400);
        const player = c.players[seat];
        if (!Array.isArray(player.characterHistory)) player.characterHistory = [];
        const incomingId = validCharacterId(b.characterId) ? String(b.characterId) : (player.characterId || null);
        const editingSame = !!player.character && !!incomingId && player.characterId === incomingId && b.type !== 'assign_character';
        const replacing = !!player.character && !!incomingId && player.characterId && player.characterId !== incomingId;
        if (replacing && c.current.mode === 'story_lock') return json({ error: 'Finish the active Story Lock before replacing a protagonist.' }, 409);
        const previous = player.character;
        if (editingSame && previous) {
          cleaned.character.stability = previous.stability || 'Composed';
          cleaned.character.wounds = Array.isArray(previous.wounds) ? previous.wounds : [];
          player.character = cleaned.character;
          player.characterId = incomingId;
          pushLog(c, 'character_edited', seat, { characterId: incomingId, name: cleaned.character.name });
        } else {
          if (previous) player.characterHistory.push({ characterId: player.characterId || null, name: previous.name, occupation: previous.occupation, replacedAt: Date.now(), revision: c.revision });
          if (player.characterHistory.length > 12) player.characterHistory = player.characterHistory.slice(-12);
          player.characterId = incomingId;
          player.character = cleaned.character;
          if (previous && previous.name !== cleaned.character.name) {
            c.journal.private[seat] = [];
            c.freeRoam.lastResult[seat] = null;
            c.flags.marked[seat] = false;
            c.flags.infection[seat] = !!c.flags.goldPlaqueDone;
            if (c.current.mode === 'story_gate') {
              c.storyLock.ready[seat] = false;
              if (c.storyLock.gate?.acknowledged) c.storyLock.gate.acknowledged[seat] = false;
            }
            const illness = c.flags.goldPlaqueDone ? ' Recent contact with Magda has left you with the same inexplicable illness already driving the investigation.' : '';
            player.entry = { pending: true, at: Date.now(), replacedName: previous.name, text: `${cleaned.character.name} enters an investigation already in motion. Your connection to Magda makes the case personal before it becomes comprehensible.${illness}` };
            pushLog(c, 'character_replaced', seat, { from: previous.name, to: cleaned.character.name, characterId: incomingId });
          } else {
            player.entry = null;
            pushLog(c, 'character_set', seat, { characterId: incomingId, occupation: cleaned.character.occupation, origin: cleaned.character.origin?.country, region: cleaned.character.origin?.region });
          }
        }
        const partyReady = c.testMode ? !!c.players.A?.character : (!!c.players.A?.character && !!c.players.B?.character && (!c.players.C || !!c.players.C.character));
        if (partyReady && c.current.mode === 'lobby') { storyGate(c,'gold_plaque',false); c.phase='chapter1'; }
      } else if (b.type === 'revise_background') {
        const player=c.players[seat];
        if (!player.character) return json({ error:'No active protagonist to revise.' },409);
        if (player.backgroundEditUsed) return json({ error:'This campaign background revision has already been used.' },409);
        if (c.flags.ambushDone || !['lobby','free_roam'].includes(c.current.mode)) return json({ error:'Background revision is only available between scenes early in Chapter I, before the first ambush.' },409);
        const cleaned=cleanCharacter(b.character); if (cleaned.error) return json({ error:cleaned.error },400);
        const revised=cleaned.character, current=player.character;
        const mechanical={ occupation:current.occupation, occupationName:current.occupationName, occupationArchetype:current.occupationArchetype, languages:current.languages, darkSecret:current.darkSecret, darkSecretName:current.darkSecretName, attributes:current.attributes, advantages:current.advantages || [], disadvantages:current.disadvantages || [], stability:current.stability || 'Composed', wounds:Array.isArray(current.wounds)?current.wounds:[] };
        player.character={ ...revised, ...mechanical };
        player.backgroundEditUsed=true;
        pushLog(c,'background_revised',seat,{characterId:player.characterId,name:player.character.name});
      } else if (b.type === 'relationship_propose') {
        const target=String(b.targetSeat || '').toUpperCase(), type=String(b.relationshipType || '');
        if (!SEATS.includes(target) || target===seat || !c.players[target]?.character) return json({ error:'Choose another active protagonist.' },400);
        if (!RELATIONSHIP_TYPES[type]) return json({ error:'Choose a valid relationship.' },400);
        const key=relationshipKey(seat,target), now=Date.now();
        c.relationships[key]={ key, seats:[seat,target].sort(), type, label:RELATIONSHIP_TYPES[type], proposer:seat, status:'pending', acceptedBy:{ [seat]:true, [target]:false }, proposedAt:now, updatedAt:now };
        pushLog(c,'relationship_proposed',seat,{target,type});
        if (!this.presence()[target]) await safeNotify(this.env,c.players[target],`${c.players[seat]?.character?.name || 'Another protagonist'} proposed a shared character relationship for your approval.`);
      } else if (b.type === 'relationship_respond') {
        const target=String(b.otherSeat || '').toUpperCase(), key=relationshipKey(seat,target), rel=c.relationships[key];
        if (!rel || rel.status!=='pending' || rel.proposer===seat) return json({ error:'No pending relationship proposal is waiting for you.' },409);
        const accept=!!b.accept;
        rel.acceptedBy={ ...(rel.acceptedBy || {}), [seat]:accept }; rel.status=accept?'accepted':'declined'; rel.respondedAt=Date.now(); rel.updatedAt=Date.now();
        pushLog(c,accept?'relationship_accepted':'relationship_declined',seat,{other:target,type:rel.type});
      } else if (b.type === 'ack_character_entry') {
        if (c.players[seat].entry) c.players[seat].entry.pending = false;
      } else if (b.type === 'story_gate_ready') {
        if (c.current.mode !== 'story_gate') return json({ error:'No Story Lock gate is active.' },409);
        if (!c.players[seat]?.character) return json({ error:'Choose a protagonist before entering the Story Lock.' },409);
        const forced=!!c.storyLock.gate?.forced;
        if (forced) c.storyLock.gate.acknowledged[seat]=true; else c.storyLock.ready[seat]=true;
        pushLog(c,'story_gate_ready',seat,{scene:c.current.scene});
        const gate=c.storyLock.gate, eligible=occupiedSeats(c,true);
        const readyMap=forced?gate.acknowledged:c.storyLock.ready;
        const readySeats=eligible.filter(st=>!!readyMap[st]);
        let activate=false, participants=[];
        if (c.testMode) {
          activate=readySeats.includes(seat); participants=activate?[seat]:[];
        } else if (gate.requirement === 'full_party') {
          const occupied=occupiedSeats(c,false);
          const missingCharacters=occupied.filter(st=>!c.players?.[st]?.character);
          const required=occupied.filter(st=>!!c.players?.[st]?.character);
          activate=missingCharacters.length===0 && required.length>=2 && required.every(st=>!!readyMap[st]);
          participants=required;
        } else {
          activate=readySeats.length>=2; participants=readySeats;
        }
        if (activate) activateStory(c,c.current.scene,participants);
        else if (!c.testMode) for (const st of otherSeats(c,seat,true)) if (!this.presence()[st]) await safeNotify(this.env,c.players[st],gate.requirement==='full_party'?'A major Story Lock requires the full active party.':'A Story Lock can begin when any two protagonists are ready.');
      } else if (b.type === 'story_gate_cancel') {
        if (c.current.mode === 'story_gate' && !c.storyLock.gate?.forced) c.storyLock.ready[seat] = false;
      } else if (b.type === 'lock_action') {
        if (c.current.mode !== 'story_lock' || !(c.storyLock.participants || []).includes(seat)) return json({ error:'Your character is not part of this scene.' },409);
        if (storyResolutionReady(c)) return json({ error:'The beat has resolved. Read the consequence and continue before another action.' },409);
        if (!c.storyLock.turn) c.storyLock.turn=makeInitiativeState(c,c.storyLock.participants||[]);
        const active=activeTurnSeat(c);
        if (active!==seat) return json({ error:`It is ${c.players?.[active]?.character?.name || 'someone else'}'s turn.` },409);
        if (c.storyLock.actions[seat]) return json({ error:'Your action for this beat is already complete.' },409);
        const allowed=availableTurnChoices(c,seat), selected=allowed.find(x=>x.id===b.actionId); if (!selected) return json({ error:'That action is no longer available.' },400);
        let roll=null;
        if (selected.move==='improvised') { const modifier=attrValue(c.players[seat].character,selected.attribute); roll={move:'Improvised Move',attribute:selected.attribute,...roll2d10(modifier)}; }
        else if (selected.move) roll=rollFor(c.players[seat].character,selected.move);
        const action={ id:selected.id,label:selected.label,move:selected.move || null,roll,repeatable:selected.repeatable===true };
        c.storyLock.actions[seat]=action;
        if (!action.repeatable && !c.storyLock.turn.usedChoices.includes(action.id)) c.storyLock.turn.usedChoices.push(action.id);
        const response=immediateTurnResponse(c,seat,action);
        c.storyLock.turn.lastResponse=response;
        c.storyLock.turn.responses.push(response);
        if (c.storyLock.turn.responses.length>12) c.storyLock.turn.responses=c.storyLock.turn.responses.slice(-12);
        if (c.current.scene==='ambush' && roll?.outcome==='failure' && !c.players[seat].character.wounds.includes('Serious Wound')) c.players[seat].character.wounds.push('Serious Wound');
        pushLog(c,'turn_action_resolved',seat,{scene:c.current.scene,beat:c.current.beat,action:selected.id,roll,initiativeIndex:c.storyLock.turn.index});
        const order=(c.storyLock.turn.order||[]).filter(st=>(c.storyLock.participants||[]).includes(st)&&c.players?.[st]?.character);
        const isLast=c.storyLock.turn.index>=order.length-1;
        if (isLast) {
          const scene=c.current.scene, beat=Number(c.current.beat||0), participants=[...order];
          const resolution=resolveJoint(c,c.storyLock.actions);
          c.storyLock.lastResolution={ pending:true, scene, beat, text:resolution, actions:Object.fromEntries(participants.map(st=>[st,c.storyLock.actions[st]])), participants, acknowledged:blankReady(), at:Date.now() };
          pushLog(c,'initiative_round_resolved',null,{scene,beat,participants,order});
        } else {
          c.storyLock.turn.index+=1;
          c.storyLock.turn.currentSeat=activeTurnSeat(c);
          const next=c.storyLock.turn.currentSeat;
          pushLog(c,'initiative_turn_advanced',null,{scene:c.current.scene,beat:c.current.beat,next});
          if (next && !this.presence()[next]) await safeNotify(this.env,c.players[next],`It is ${c.players[next]?.character?.name || 'your character'}'s turn in the current scene.`);
        }
      } else if (b.type === 'story_resolution_continue') {
        const lr=c.storyLock.lastResolution;
        if (c.current.mode!=='story_lock' || !lr?.pending) return json({error:'There is no resolved story beat waiting to continue.'},409);
        if (!(lr.participants || []).includes(seat)) return json({error:'This resolution belongs to the protagonists who entered the Story Lock.'},403);
        lr.acknowledged={...blankReady(),...(lr.acknowledged||{})};
        lr.acknowledged[seat]=true;
        pushLog(c,'story_resolution_acknowledged',seat,{scene:lr.scene,beat:lr.beat});
        const participants=(lr.participants || []).filter(st=>c.players?.[st]?.character);
        const allRead=participants.every(st=>!!lr.acknowledged[st]);
        if (allRead) {
          const scene=lr.scene, beat=Number(lr.beat || 0), finalBeat=beat>=storyMaxBeat(scene);
          if (!finalBeat) {
            c.current={mode:'story_lock',scene,beat:beat+1};
            c.storyLock.lastResolution=null;
            c.storyLock.actions={};
            resetInitiativeBeat(c);
          } else if (scene==='gold_plaque') {
            c.flags.goldPlaqueDone=true; for (const st of participants) c.flags.infection[st]=true; finishStory(c);
          } else if (scene==='ambush') {
            c.flags.ambushDone=true; finishStory(c);
          } else if (scene==='pogodin') {
            const performers=participants.filter(st=>lr.actions?.[st]?.id==='perform_ritual');
            for (const st of performers) c.flags.marked[st]=true;
            c.flags.betaComplete=true; c.phase='beta_complete'; c.current={mode:'epilogue',scene:'chapter1_boundary',beat:0}; c.storyLock.active=false; c.storyLock.actions={}; c.storyLock.participants=[]; c.storyLock.lastResolution=null; c.storyLock.turn=null;
          }
          pushLog(c,'story_beat_advanced',null,{scene,beat,finalBeat,participants});
        }
      } else if (b.type === 'free_roam_action') {
        const lockedParticipant=c.current.mode==='story_lock'&&(c.storyLock.participants || []).includes(seat);
        const committedAtGate=c.current.mode==='story_gate'&&!!(c.storyLock.gate?.forced?c.storyLock.gate?.acknowledged?.[seat]:c.storyLock.ready?.[seat]);
        if (lockedParticipant || committedAtGate || (c.current.mode!=='free_roam' && c.current.mode!=='story_gate' && c.current.mode!=='story_lock')) return json({ error:'Free Roam is not available to this protagonist right now.' },409);
        const slot = nextSlot(c, seat); if (slot < 0) return json({ error: 'You have used all Free Roam time for this beta day.' }, 409);
        const loc = FREE_ROAM_LOCATIONS[b.location]; const act = loc?.actions?.[b.actionId]; if (!loc || !act) return json({ error: 'That Free Roam action is not available.' }, 400);
        let roll = null;
        if (act.move) roll = rollFor(c.players[seat].character, act.move);
        const result = { id: randId('fr_'), location: b.location, locationName: loc.name, actionId: b.actionId, label: act.label, prose: act.prose, clueId: act.clue, roll, art: loc.art, frame: loc.frame, at: Date.now() };
        c.freeRoam.slots[seat][slot] = result.id; c.freeRoam.lastResult[seat] = result; addPrivateClue(c, seat, act.clue, loc.name); pushLog(c, 'free_roam_action', seat, { location: b.location, action: b.actionId, roll });
        const eligible=occupiedSeats(c,true), oneSlot=eligible.filter(st=>spentCount(c,st)>=1).length, twoSlots=eligible.filter(st=>spentCount(c,st)>=2).length;
        const soloPrivateClues=c.testMode?new Set((c.journal.private[seat]||[]).map(x=>x.clueId)).size:0;
        const ambushThreshold=c.testMode?spentCount(c,seat)>=2:oneSlot>=2;
        const pogodinThreshold=c.testMode?(soloPrivateClues>=3||spentCount(c,seat)>=3):(sharedClueCount(c)>=3||twoSlots>=2);
        if (c.current.mode==='free_roam'&&!c.flags.ambushDone&&ambushThreshold) { storyGate(c,'ambush',true); if(!c.testMode)for (const st of otherSeats(c,seat,true)) if (!this.presence()[st]) await safeNotify(this.env,c.players[st],'An event has interrupted Free Roam. Open The Black Madonna when you can.'); }
        else if (c.current.mode==='free_roam'&&c.flags.ambushDone&&!c.flags.pogodinAvailable&&pogodinThreshold) { c.flags.pogodinAvailable=true; storyGate(c,'pogodin',false); }
      } else if (b.type === 'share_clue') {
        const clueId = String(b.clueId || ''); if (!c.journal.private[seat].some(x => x.clueId === clueId)) return json({ error: 'You do not have that clue.' }, 400);
        if (!c.journal.shared.some(x => x.clueId === clueId)) c.journal.shared.push({ clueId, sourceSeat: seat, source: b.source || '', at: Date.now() }); pushLog(c, 'clue_shared', seat, { clueId });
        const evidenceThreshold=c.testMode?new Set((c.journal.private[seat]||[]).map(x=>x.clueId)).size>=3:sharedClueCount(c)>=3;
        if (c.flags.ambushDone && !c.flags.pogodinAvailable && evidenceThreshold) { c.flags.pogodinAvailable = true; storyGate(c, 'pogodin', false); }
      } else if (b.type === 'roll') {
        const moveKey = String(b.move || ''); const move = MOVE_MAP[moveKey]; if (!move) return json({ error: 'Unknown move.' }, 400);
        const roll = rollFor(c.players[seat].character, moveKey, Number(b.extra || 0)); c.freeRoam.lastResult[seat] = { kind: 'roll', roll, at: Date.now() }; pushLog(c, 'roll_resolved', seat, { roll });
      } else return json({ error: 'Unknown action.' }, 400);
      // A replacement character's entry note is shown on the first rendered campaign page.
      // After that protagonist takes any normal action, consider the handoff integrated into play.
      if (!['ack_character_entry','assign_character','set_character','edit_character','revise_background','relationship_propose','relationship_respond','story_gate_ready','story_gate_cancel'].includes(b.type) && c.players[seat].entry?.pending) c.players[seat].entry.pending = false;
      if (clientActionId) { c.processedActions.push(clientActionId); if (c.processedActions.length > 80) c.processedActions = c.processedActions.slice(-80); }
      await this.save(c, b.type || 'action'); this.broadcast(c); return json({ ok: true, state: publicView(c, uid, this.presence()) });
    }
    return json({ error: 'Not found.' }, 404);
  }
}

function elevenKeyInfo(env) {
  const options=[
    ['KULT_ELEVENLABS_API_KEY',env.KULT_ELEVENLABS_API_KEY],
    ['ELEVENLABS_API_KEY',env.ELEVENLABS_API_KEY],
    ['SANGRIS_ELEVENLABS_API_KEY',env.SANGRIS_ELEVENLABS_API_KEY],
    ['SANGRIS_ELEVENLABS_KEY',env.SANGRIS_ELEVENLABS_KEY],
    ['SANGRIS_API_KEY',env.SANGRIS_API_KEY],
    ['BLOODLINES_ELEVENLABS_API_KEY',env.BLOODLINES_ELEVENLABS_API_KEY],
    ['ELEVENLABS_KEY',env.ELEVENLABS_KEY],
    ['ELEVENLABS_TOKEN',env.ELEVENLABS_TOKEN],
    ['XI_API_KEY',env.XI_API_KEY],
    ['XI_API_TOKEN',env.XI_API_TOKEN],
  ];
  const found=options.find(([,value])=>String(value || '').trim());
  return found ? { key:String(found[1]).trim(), binding:found[0] } : { key:'', binding:null };
}
function safeVoiceId(value) { const v = String(value || '').trim(); return /^[A-Za-z0-9_-]{10,64}$/.test(v) ? v : DEFAULT_VOICE_ID; }
async function shortHash(text) { const d = await sha(text); return [...d.slice(0, 10)].map(x => x.toString(16).padStart(2,'0')).join(''); }
let sharedFeaturedCache = { at: 0, voices: [] };
function normalizedVoiceName(value) {
  return String(value || '').toLowerCase().replace(/[—–]/g, '-').replace(/[^a-z0-9]+/g, ' ').trim();
}
async function resolveSharedFeaturedVoices(env) {
  const key=elevenKeyInfo(env).key;
  if (!key) return [];
  const now = Date.now();
  if (sharedFeaturedCache.at && now - sharedFeaturedCache.at < 10 * 60 * 1000) return sharedFeaturedCache.voices;
  const found = [];
  for (const spec of FEATURED_SHARED_SEARCHES) {
    try {
      const response = await fetch(`${ELEVEN_BASE}/v1/shared-voices?page_size=30&search=${encodeURIComponent(spec.search)}`, { headers: { 'xi-api-key': key } });
      if (!response.ok) continue;
      const data = await response.json();
      const target = normalizedVoiceName(spec.exactName);
      const voice = (data.voices || []).find(v => normalizedVoiceName(v.name) === target)
        || (data.voices || []).find(v => normalizedVoiceName(v.name).includes('dominic') && normalizedVoiceName(v.name).includes('brooding'));
      if (!voice?.voice_id) continue;
      found.push({
        voice_id: voice.voice_id,
        name: voice.name || spec.exactName,
        category: voice.category || 'featured',
        description: voice.description || spec.description,
        labels: { accent: voice.accent || 'British', gender: voice.gender || 'male', age: voice.age || '', use_case: voice.use_case || 'narrative_story', descriptive: voice.descriptive || 'intense', sangris: 'featured' },
        preview_url: voice.preview_url || null,
        sangris_featured: true,
        sangris_featured_rank: spec.rank,
        shared_voice: true,
      });
    } catch (_) {}
  }
  sharedFeaturedCache = { at: now, voices: found };
  return found;
}
async function listVoices(env) {
  const key=elevenKeyInfo(env).key;
  if (!key) throw new Error('No ElevenLabs API key binding is visible to The Black Madonna Worker. Configure KULT_ELEVENLABS_API_KEY as a Cloudflare Secret.');
  const r = await fetch(`${ELEVEN_BASE}/v2/voices?page_size=100&sort=name&sort_direction=asc&include_total_count=false`, { headers: { 'xi-api-key': key } });
  if (!r.ok) throw new Error(`ElevenLabs voices request failed (${r.status})`);
  const d = await r.json();
  const voices = (d.voices || []).map(v => ({ voice_id: v.voice_id, name: v.name || 'Unnamed voice', category: v.category || '', description: v.description || '', labels: v.labels || {}, preview_url: v.preview_url || null }));
  for (const featured of FEATURED_VOICES) {
    const existing = voices.find(v => v.voice_id === featured.voice_id);
    if (existing) Object.assign(existing, { sangris_featured: true, sangris_featured_rank: featured.sangris_featured_rank, description: existing.description || featured.description, labels: { ...featured.labels, ...(existing.labels || {}) } });
  }
  for (const featured of await resolveSharedFeaturedVoices(env)) {
    const existing = voices.find(v => v.voice_id === featured.voice_id);
    if (existing) Object.assign(existing, { ...featured, labels: { ...(existing.labels || {}), ...(featured.labels || {}) } });
    else voices.push(featured);
  }
  voices.sort((a,b) => {
    if (a.voice_id === DEFAULT_VOICE_ID) return -1;
    if (b.voice_id === DEFAULT_VOICE_ID) return 1;
    const ar = Number.isFinite(Number(a.sangris_featured_rank)) ? Number(a.sangris_featured_rank) : 999;
    const br = Number.isFinite(Number(b.sangris_featured_rank)) ? Number(b.sangris_featured_rank) : 999;
    return ar - br || String(a.name).localeCompare(String(b.name));
  });
  return voices;
}
async function narrationDiagnostics(env) {
  const info=elevenKeyInfo(env);
  const out={configured:!!info.key,binding:info.binding,r2Configured:!!env.NARRATION_AUDIO,elevenlabsOk:false,status:null,detail:null,model:MODEL_ID,streaming:true};
  if(!info.key){out.detail='No ElevenLabs secret was found. Add KULT_ELEVENLABS_API_KEY to this Worker as a Cloudflare Secret.';return out;}
  try{
    const r=await fetch(`${ELEVEN_BASE}/v2/voices?page_size=1&include_total_count=false`,{headers:{'xi-api-key':info.key}});
    out.status=r.status; out.elevenlabsOk=r.ok;
    if(!r.ok) out.detail=(await r.text()).slice(0,600);
    else out.detail='The key was accepted by ElevenLabs.';
  }catch(e){out.detail=String(e?.message || e);}
  return out;
}

async function elevenTTSWithRetry(url, options) {
  let last = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, options);
      last = response;
      if (response.ok || ![408,425,429,500,502,503,504].includes(response.status)) return response;
      if (attempt < 2) {
        const retryAfter = Number(response.headers.get('retry-after') || 0);
        const delay = retryAfter > 0 ? Math.min(retryAfter * 1000, 5000) : 550 * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      if (attempt === 2) throw error;
      await new Promise(resolve => setTimeout(resolve, 550 * Math.pow(2, attempt)));
    }
  }
  return last;
}
async function tts(env, voiceId, text, cacheKey, ctx) {
  const apiKey=elevenKeyInfo(env).key;
  if (!apiKey) return json({ error:'KULT ElevenLabs narration is not configured. Add KULT_ELEVENLABS_API_KEY to this Worker as a Cloudflare Secret.' },503);
  if (!env.NARRATION_AUDIO) return json({ error: 'Narration R2 binding is not configured.' }, 503);
  const cleaned = String(text || '').replace(/\r/g,'').trim();
  if (!cleaned || cleaned.length > 18000) return json({ error: 'Invalid narration text.' }, 400);
  const version = await shortHash(`${MODEL_ID}
${AUDIO_PROFILE_VERSION}
${JSON.stringify(VOICE_SETTINGS)}
${voiceId}
${cleaned}`);
  const objectKey = `chagidiel/${voiceId}/${cacheKey}_${version}.mp3`;
  const cached = await env.NARRATION_AUDIO.get(objectKey);
  if (cached) {
    const h = new Headers();
    cached.writeHttpMetadata(h);
    h.set('content-type','audio/mpeg');
    h.set('cache-control','private, max-age=31536000');
    h.set('content-length',String(cached.size || 0));
    h.set('x-narration-cache','HIT');
    h.set('x-narration-model',MODEL_ID);
    h.set('x-narration-stream','1');
    return new Response(cached.body,{headers:h});
  }
  const r = await elevenTTSWithRetry(`${ELEVEN_BASE}/v1/text-to-speech/${encodeURIComponent(voiceId)}/stream?output_format=${OUTPUT_FORMAT}`, { method:'POST', headers:{'xi-api-key':apiKey,'content-type':'application/json',accept:'audio/mpeg'}, body:JSON.stringify({text:cleaned,model_id:MODEL_ID,voice_settings:VOICE_SETTINGS}) });
  if (!r?.ok) return json({ error:'ElevenLabs generation failed.', status:r?.status || 502, detail:r ? (await r.text()).slice(0,500) : 'No response from ElevenLabs.' },502);
  const headers=new Headers({'content-type':'audio/mpeg','cache-control':'private, max-age=31536000','x-narration-cache':'MISS','x-narration-model':MODEL_ID,'x-narration-stream':'1'});
  if (r.body && typeof r.body.tee === 'function') {
    const [clientStream,cacheStream]=r.body.tee();
    const cacheJob=(async()=>{const audio=await new Response(cacheStream).arrayBuffer();if(audio.byteLength)await env.NARRATION_AUDIO.put(objectKey,audio,{httpMetadata:{contentType:'audio/mpeg'}})})();
    if(ctx?.waitUntil)ctx.waitUntil(cacheJob.catch(()=>{}));else await cacheJob.catch(()=>{});
    return new Response(clientStream,{headers});
  }
  const audio = await r.arrayBuffer();
  await env.NARRATION_AUDIO.put(objectKey,audio,{httpMetadata:{contentType:'audio/mpeg'}});
  headers.set('content-length',String(audio.byteLength));
  return new Response(audio,{headers});
}

function campaignStub(env, id) { return env.CAMPAIGNS.get(env.CAMPAIGNS.idFromName(id)); }
function authStub(env) { return env.AUTH.get(env.AUTH.idFromName('global')); }
async function authFromRequest(request, env, url) {
  const payload = await verifySession(env, bearer(request, url));
  if (!payload?.uid) return null;
  const checked = await authStub(env).fetch('https://auth/session', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ uid: payload.uid, sv: payload.sv }) });
  if (!checked.ok) return null;
  const data = await checked.json();
  return data.user ? { ...payload, ...data.user, contact: data.user.email, method: 'email' } : null;
}
async function forwardCampaign(request, env, id, path, user, body = null) {
  const h = new Headers(); h.set('x-chagidiel-user', user.uid); h.set('x-chagidiel-contact', user.contact); h.set('x-chagidiel-method', user.method); if (body !== null) h.set('content-type','application/json');
  return campaignStub(env,id).fetch(`https://campaign${path}`, { method: body === null ? request.method : 'POST', headers:h, body: body === null ? undefined : JSON.stringify(body) });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/health') {
      const smsLoginMode = twilioVerifyConfigured(env) ? 'twilio_verify' : (twilioMessagingConfigured(env) ? 'twilio_messages' : null);
      return json({
        ok:true, build:'black-madonna-beta-12.6-initiative-hires-media',
        elevenlabsConfigured:!!elevenKeyInfo(env).key,
        elevenlabsBinding:elevenKeyInfo(env).binding,
        kultElevenlabsConfigured:!!env.KULT_ELEVENLABS_API_KEY,
        r2Configured:!!env.NARRATION_AUDIO,
        authSecretConfigured:!!env.AUTH_SECRET,
        emailConfigured:!!(env.RESEND_API_KEY&&env.RESEND_FROM),
        emailLoginConfigured:!!(env.RESEND_API_KEY&&env.RESEND_FROM),
        smsConfigured:!!smsLoginMode,
        smsLoginConfigured:!!smsLoginMode,
        smsLoginMode,
        smsAlertsConfigured:twilioMessagingConfigured(env),
        twilioVerifyServiceConfigured:twilioVerifyConfigured(env),
        webPushConfigured:false,
        passwordAccounts:true,
        adminBootstrapConfigured:!!(env.ADMIN_EMAIL&&env.ADMIN_PASSWORD),
        passwordResetEmailConfigured:!!(env.RESEND_API_KEY&&env.RESEND_FROM),
        characterLibrary:true,
        progressiveCampaignSave:true,
        accountCampaignResume:true,
        sangrisFeaturedVoices:true,
        readAloudProfile:AUDIO_PROFILE_VERSION,
        campaignInviteManagement:true,
        characterDrafts:true,
        optionalThirdSeat:true,
        relationshipConsent:true,
        oneTimeBackgroundRevision:true,
        campaignReset:true,
        notificationCenter:true,
        mobileNavigationV2:true,
        dialoguePageV2:true,
        campaignLibrary:true,
        campaignStateCopies:true,
        presenceDropdown:true,
        legacyCatherineCleanup:true,
        sangrisNarrationBackend:true,
        narrationModel:MODEL_ID,
        narrationStreaming:true,
        narrationProgress:true,
        adminSinglePlayerTestMode:true,
        storyResolutionPages:true,
        narrativeFlowRewrite:true,
        freeRoamRendererRestored:true,
        immersiveNarration:true,
        personalObservationFirst:true,
        narrationTextHighlight:true,
        twelveHourClock:true,
        initiativeStoryLocks:true,
        sharedTurnResponses:true,
        consumedSharedChoices:true,
        highResolutionMediaArtwork:true
      },200,{'cache-control':'no-store'});
    }
    if (url.pathname === '/api/config') return json({ vapidPublicKey: env.VAPID_PUBLIC_KEY || null, pushDelivery: false });
    if (['/api/auth/register','/api/auth/login','/api/auth/forgot','/api/auth/reset','/api/auth/request','/api/auth/verify'].includes(url.pathname)) {
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
      const map = {
        '/api/auth/register':'/register','/api/auth/login':'/login','/api/auth/forgot':'/forgot','/api/auth/reset':'/reset',
        '/api/auth/request':'/request','/api/auth/verify':'/verify'
      };
      const headers = new Headers(request.headers);
      headers.set('x-chagidiel-origin', url.origin);
      const body = await request.text();
      return authStub(env).fetch(`https://auth${map[url.pathname]}`, { method: 'POST', headers, body });
    }
    if (url.pathname === '/api/auth/me') {
      const user = await authFromRequest(request, env, url);
      if (!user) return json({ error: 'Authentication required.' }, 401);
      return json({ ok: true, user: { uid:user.uid, email:user.email, contact:user.email, method:'email', role:user.role, createdAt:user.createdAt, lastLoginAt:user.lastLoginAt } });
    }
    if (url.pathname === '/api/characters' && ['GET','POST'].includes(request.method)) {
      const user = await authFromRequest(request, env, url);
      if (!user) return json({ error: 'Authentication required.' }, 401);
      const headers = new Headers({ 'x-chagidiel-user': user.uid });
      if (request.method === 'POST') headers.set('content-type','application/json');
      return authStub(env).fetch('https://auth/characters', { method: request.method, headers, body: request.method === 'POST' ? await request.text() : undefined });
    }
    if (url.pathname === '/api/character-drafts' && ['GET','POST'].includes(request.method)) {
      const user=await authFromRequest(request,env,url); if(!user)return json({error:'Sign in required.'},401);
      const headers=new Headers({'x-chagidiel-user':user.uid}); if(request.method==='POST')headers.set('content-type','application/json');
      return authStub(env).fetch('https://auth/character-drafts',{method:request.method,headers,body:request.method==='POST'?await request.text():undefined});
    }
    const draftApiMatch=url.pathname.match(/^\/api\/character-drafts\/(dr_[a-f0-9]+)$/);
    if (draftApiMatch && ['GET','PUT','DELETE'].includes(request.method)) {
      const user=await authFromRequest(request,env,url); if(!user)return json({error:'Sign in required.'},401);
      const headers=new Headers({'x-chagidiel-user':user.uid}); if(request.method==='PUT')headers.set('content-type','application/json');
      return authStub(env).fetch(`https://auth/character-drafts/${draftApiMatch[1]}`,{method:request.method,headers,body:request.method==='PUT'?await request.text():undefined});
    }
    const characterApiMatch = url.pathname.match(/^\/api\/characters\/(pc_[a-f0-9]+)$/);
    if (characterApiMatch && ['GET','PUT','DELETE'].includes(request.method)) {
      const user = await authFromRequest(request, env, url);
      if (!user) return json({ error: 'Authentication required.' }, 401);
      const headers = new Headers({ 'x-chagidiel-user': user.uid });
      if (request.method === 'PUT') headers.set('content-type','application/json');
      return authStub(env).fetch(`https://auth/characters/${characterApiMatch[1]}`, { method: request.method, headers, body: request.method === 'PUT' ? await request.text() : undefined });
    }
    if (url.pathname === '/api/campaigns/mine' && request.method === 'GET') {
      const user = await authFromRequest(request, env, url);
      if (!user) return json({ error: 'Authentication required.' }, 401);
      return authStub(env).fetch('https://auth/campaigns', { method:'GET', headers:{ 'x-chagidiel-user':user.uid } });
    }
    if (url.pathname === '/api/campaigns/library' && request.method === 'GET') {
      const user=await authFromRequest(request,env,url); if(!user)return json({error:'Authentication required.'},401);
      const memResp=await authStub(env).fetch('https://auth/campaigns',{method:'GET',headers:{'x-chagidiel-user':user.uid}});
      const mem=await memResp.json(); const ids=Array.isArray(mem.ids)?mem.ids.slice(0,30):[];
      const results=await Promise.all(ids.map(async id=>{
        try{const r=await campaignStub(env,id).fetch('https://campaign/summary',{headers:{'x-chagidiel-user':user.uid}});if(!r.ok)return {id,stale:r.status===404||r.status===403};const d=await r.json();return {id,summary:d.summary};}catch(_){return {id,stale:false};}
      }));
      const stale=results.filter(x=>x.stale).map(x=>x.id);
      for(const campaignId of stale) await authStub(env).fetch('https://auth/campaigns',{method:'DELETE',headers:{'x-chagidiel-user':user.uid,'content-type':'application/json'},body:JSON.stringify({campaignId})});
      const campaigns=results.map(x=>x.summary).filter(Boolean).sort((a,b)=>Number(b.savedAt||0)-Number(a.savedAt||0));
      return json({ok:true,campaigns,lastId:mem.lastId || null});
    }
    if (url.pathname === '/api/admin/users' && request.method === 'GET') {
      const user = await authFromRequest(request, env, url);
      if (!user || user.role !== 'admin') return json({ error: 'Administrator access required.' }, 403);
      return authStub(env).fetch('https://auth/admin/users', { method:'GET', headers:{ 'x-chagidiel-admin':'1', 'x-chagidiel-admin-uid':user.uid, 'x-chagidiel-origin':url.origin } });
    }
    if (url.pathname === '/api/admin/reset' && request.method === 'POST') {
      const user = await authFromRequest(request, env, url);
      if (!user || user.role !== 'admin') return json({ error: 'Administrator access required.' }, 403);
      const body = await request.text();
      return authStub(env).fetch('https://auth/admin/reset', { method:'POST', headers:{ 'content-type':'application/json', 'x-chagidiel-admin':'1', 'x-chagidiel-admin-uid':user.uid, 'x-chagidiel-origin':url.origin }, body });
    }
    if (url.pathname === '/api/narration-diagnostics' && request.method === 'GET') {
      const user=await authFromRequest(request,env,url); if(!user)return json({error:'Authentication required.'},401);
      return json({ok:true,...await narrationDiagnostics(env)},200,{'cache-control':'no-store'});
    }
    if (url.pathname === '/api/voices') {
      const user = await authFromRequest(request, env, url); if (!user) return json({ error:'Authentication required.' },401);
      try { const voices=await listVoices(env); const preferred=voices.some(v=>v.voice_id===DEFAULT_VOICE_ID)?DEFAULT_VOICE_ID:(voices[0]?.voice_id||DEFAULT_VOICE_ID); return json({ default_voice_id:preferred, voices }); } catch(e){ return json({error:String(e.message||e)},502); }
    }
    if (url.pathname === '/api/narration-page') {
      if (request.method !== 'POST') return json({error:'Method not allowed.'},405);
      const user = await authFromRequest(request, env, url); if (!user) return json({ error:'Authentication required.' },401);
      const site = request.headers.get('sec-fetch-site'); if (site && !['same-origin','same-site','none'].includes(site)) return json({ error:'Cross-site narration is not permitted.' },403);
      let b; try{b=await request.json();}catch(_){return json({error:'Invalid JSON.'},400);}
      const voice=safeVoiceId(b.voice); const scene=String(b.scene||'page').replace(/[^A-Za-z0-9_-]/g,'').slice(0,80)||'page'; const hash=await shortHash(String(b.text||'')); return tts(env,voice,b.text,`${scene}_${hash}`,ctx);
    }
    if (url.pathname === '/api/campaigns' && request.method === 'POST') {
      const user = await authFromRequest(request,env,url); if(!user) return json({error:'Authentication required.'},401);
      let createBody={}; try{createBody=await request.clone().json()}catch(_){}
      const id = randId('c_').slice(0,18); const invite = randId('').slice(0,10).toUpperCase();
      const name=String(createBody.name || '').trim().slice(0,80);
      const testMode=!!createBody.testMode;
      if(testMode && user.role!=='admin') return json({error:'Administrator access is required for single-player test campaigns.'},403);
      const h=new Headers({'x-chagidiel-user':user.uid,'x-chagidiel-contact':user.contact,'x-chagidiel-method':user.method,'content-type':'application/json'});
      const response = await campaignStub(env,id).fetch('https://campaign/init',{method:'POST',headers:h,body:JSON.stringify({id,invite,name,testMode})});
      const data = await response.json();
      if (response.ok) await authStub(env).fetch('https://auth/campaigns',{method:'POST',headers:{'x-chagidiel-user':user.uid,'content-type':'application/json'},body:JSON.stringify({campaignId:id})});
      return json(data,response.status);
    }
    if (url.pathname === '/api/campaigns/join' && request.method === 'POST') {
      const user = await authFromRequest(request,env,url); if(!user) return json({error:'Authentication required.'},401);
      const b=await request.json(); const id=String(b.campaignId||''); if(!validCampaignId(id)) return json({error:'Invalid campaign id.'},400);
      const response = await forwardCampaign(request,env,id,'/join',user,{invite:b.invite});
      const data = await response.json();
      if (response.ok) await authStub(env).fetch('https://auth/campaigns',{method:'POST',headers:{'x-chagidiel-user':user.uid,'content-type':'application/json'},body:JSON.stringify({campaignId:id})});
      return json(data,response.status);
    }
    const campaignManageMatch=url.pathname.match(/^\/api\/campaigns\/(c_[a-f0-9]+)$/);
    if(campaignManageMatch && ['PATCH','DELETE'].includes(request.method)){
      const user=await authFromRequest(request,env,url);if(!user)return json({error:'Authentication required.'},401);const id=campaignManageMatch[1];
      if(request.method==='PATCH'){let b={};try{b=await request.json()}catch(_){};return forwardCampaign(request,env,id,'/rename',user,{name:b.name});}
      const h=new Headers({'x-chagidiel-user':user.uid});const resp=await campaignStub(env,id).fetch('https://campaign/delete',{method:'DELETE',headers:h});const data=await resp.json();
      if(resp.ok)for(const memberUid of (data.members||[]))await authStub(env).fetch('https://auth/campaigns',{method:'DELETE',headers:{'x-chagidiel-user':memberUid,'content-type':'application/json'},body:JSON.stringify({campaignId:id})});
      return json(data,resp.status);
    }
    const cloneMatch=url.pathname.match(/^\/api\/campaigns\/(c_[a-f0-9]+)\/clone$/);
    if(cloneMatch && request.method==='POST'){
      const user=await authFromRequest(request,env,url);if(!user)return json({error:'Authentication required.'},401);const sourceId=cloneMatch[1];
      const sourceResp=await campaignStub(env,sourceId).fetch('https://campaign/clone-source',{headers:{'x-chagidiel-user':user.uid}});const sourceData=await sourceResp.json();if(!sourceResp.ok)return json(sourceData,sourceResp.status);
      let body={};try{body=await request.json()}catch(_){};const id=randId('c_').slice(0,18);const name=String(body.name||`${sourceData.snapshot?.name||'Black Madonna'} — Saved State`).trim().slice(0,80);
      const h=new Headers({'x-chagidiel-user':user.uid,'x-chagidiel-contact':user.contact,'x-chagidiel-method':user.method,'content-type':'application/json'});
      const cloneResp=await campaignStub(env,id).fetch('https://campaign/clone-init',{method:'POST',headers:h,body:JSON.stringify({id,name,snapshot:sourceData.snapshot})});const cloneData=await cloneResp.json();
      if(cloneResp.ok)for(const memberUid of (sourceData.members||[]))await authStub(env).fetch('https://auth/campaigns',{method:'POST',headers:{'x-chagidiel-user':memberUid,'content-type':'application/json'},body:JSON.stringify({campaignId:id})});
      return json(cloneData,cloneResp.status);
    }
    const inviteMatch = url.pathname.match(/^\/api\/campaigns\/(c_[a-f0-9]+)\/invite$/);
    if (inviteMatch && ['GET','POST'].includes(request.method)) {
      const user = await authFromRequest(request,env,url); if(!user) return json({error:'Authentication required.'},401);
      const id=inviteMatch[1];
      if(request.method==='POST'){let b={};try{b=await request.json()}catch(_){};return forwardCampaign(request,env,id,'/invite',user,b)}
      return forwardCampaign(request,env,id,'/invite',user,null);
    }
    const m = url.pathname.match(/^\/api\/campaigns\/(c_[a-f0-9]+)\/(state|action|ws)$/);
    if (m) {
      const user = await authFromRequest(request,env,url); if(!user) return json({error:'Authentication required.'},401); const id=m[1], op=m[2];
      if (op === 'ws') { const h=new Headers(request.headers); h.set('x-chagidiel-user',user.uid); h.set('x-chagidiel-contact',user.contact); h.set('x-chagidiel-method',user.method); return campaignStub(env,id).fetch('https://campaign/ws',{method:'GET',headers:h}); }
      if (op === 'state') {
        const response = await forwardCampaign(request,env,id,'/state',user,null);
        if (response.ok) await authStub(env).fetch('https://auth/campaigns',{method:'POST',headers:{'x-chagidiel-user':user.uid,'content-type':'application/json'},body:JSON.stringify({campaignId:id})});
        return response;
      }
      if (op === 'action') { if(request.method!=='POST') return json({error:'Method not allowed.'},405); const b=await request.json(); return forwardCampaign(request,env,id,'/action',user,b); }
    }
    return env.ASSETS.fetch(request);
  },
};
