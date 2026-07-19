import type { Video } from '@/types'

function v(
  id: string, lang: string,
  titleEn: string, titleHe: string,
  descEn: string, descHe: string,
  youtube_id: string,
  category: string,
  content_type: 'lesson' | 'sentences' | 'culture',
  difficulty: 1|2|3|4|5,
  duration: number | null,
  source_label?: string,
): Video {
  return {
    id, language: lang,
    title: { en: titleEn, he: titleHe },
    description: { en: descEn, he: descHe },
    youtube_id, category, content_type,
    difficulty, duration_seconds: duration,
    thumbnail_url: null,
    source_label,
  }
}

export const VIDEO_DATA: Video[] = [

  // ══════════════════════════════════════════════════════
  //  S P A N I S H
  // ══════════════════════════════════════════════════════

  // — Lessons —
  v('es-l1','es','Spanish for Beginners – Complete A1 Course','ספרדית למתחילים – קורס A1 מלא',
    'Complete Spanish beginner course: greetings, numbers, food and daily life.','קורס ספרדית מלא למתחילים.',
    'XLjKDxKMkI0','greetings','lesson',1,10800),
  v('es-l2','es','100 Most Common Spanish Words','100 המילים הנפוצות ביותר בספרדית',
    'The 100 most essential Spanish words for beginners.','100 מילות הספרדית החיוניות ביותר למתחיל.',
    'nnAz4-Y0PMs','vocabulary','lesson',1,900),
  v('es-l3','es','Spanish Numbers 1–100','מספרים בספרדית 1–100',
    'Count from 1 to 100 in Spanish with clear pronunciation.','ספור מ-1 עד 100 בספרדית עם הגייה ברורה.',
    'XdKAQXZ4fBU','numbers','lesson',1,480),
  v('es-l4','es','Spanish Food Vocabulary','אוצר מילים של אוכל בספרדית',
    'Essential Spanish words for food, drinks and restaurants.','מילות אוכל, שתייה והזמנה במסעדה בספרדית.',
    'G1n69_irdXE','food','lesson',1,600),
  v('es-l5','es','Spanish Travel Phrases','ביטויי נסיעה בספרדית',
    'Must-know phrases for traveling in Spanish-speaking countries.','ביטויים חובה לנסיעה בארצות דוברות ספרדית.',
    'VG2s0IZxFPY','travel','lesson',2,720),
  v('es-l6','es','Spanish Colors & Adjectives','צבעים ותארים בספרדית',
    'Learn all colors and basic adjectives in Spanish.','למד צבעים ותארים בסיסיים בספרדית.',
    'Uc14R1Y77Xc','colors','lesson',1,420),
  v('es-l7','es','Spanish Family Vocabulary','מילות משפחה בספרדית',
    'Learn family members and relationships in Spanish.','למד בני משפחה ויחסים בספרדית.',
    'hn_O8CllHIs','family','lesson',1,540),
  v('es-l8','es','Spanish Days, Months & Time','ימים, חודשים וזמן בספרדית',
    'Days of the week, months and telling time in Spanish.','ימות השבוע, חודשים ואמירת שעה.',
    'WiE2VJWbDas','time','lesson',2,660),
  v('es-l9','es','Spanish Body Parts','חלקי גוף בספרדית',
    'Essential body parts vocabulary in Spanish.','אוצר מילים של חלקי גוף בספרדית.',
    'J_GBdvYDdlk','body','lesson',1,420),
  v('es-l10','es','Spanish Emotions & Feelings','רגשות ותחושות בספרדית',
    'Express your feelings and emotions in Spanish.','בטא רגשות ותחושות בספרדית.',
    'YQE2lRvgerQ','emotions','lesson',2,540),

  // — Sentences —
  v('es-s1','es','50 Basic Spanish Sentences for Beginners','50 משפטים בסיסיים בספרדית למתחילים',
    'Short everyday sentences you can use from day one.','משפטים יומיומיים קצרים לשימוש מהיום הראשון.',
    '0KwtaThMuBg','sentences','sentences',1,720),
  v('es-s2','es','Spanish Phrases You Use Every Day','ביטויי ספרדית לשימוש יומיומי',
    '40 must-know Spanish phrases for daily conversations.','40 ביטויים חובה לשיחות יומיומיות.',
    'P5pVb2H1-JE','phrases','sentences',1,600),
  v('es-s3','es','Spanish Questions & Answers – Dialogue Practice','שאלות ותשובות בספרדית',
    'Practice real Spanish conversations with this Q&A dialogue video.','תרגל שיחות ספרדיות אמיתיות.',
    '_8xbBzgJiHk','dialogue','sentences',2,900),
  v('es-s4','es','Learn Spanish with Short Stories','למד ספרדית עם סיפורים קצרים',
    'Beginner-friendly short stories in slow Spanish.','סיפורים קצרים ידידותיים למתחילים בספרדית איטית.',
    'u_yNiLMxrZ0','stories','sentences',2,1200),

  // — Culture —
  v('es-c1','es','Despacito – Learn Spanish with Luis Fonsi','Despacito – למד ספרדית עם לואיס פונסי',
    'Learn Spanish vocabulary and pronunciation through this mega-hit song.','למד אוצר מילים והגייה בספרדית דרך שיר הענק.',
    'kJQP7kiw5Fk','song','culture',2,280,'🎵 Luis Fonsi'),
  v('es-c2','es','Waka Waka – Shakira | Spanish Lyrics Explained','Waka Waka – שקירה | מילות השיר מוסברות',
    'Understand the Spanish lyrics of Shakira\'s famous FIFA 2010 anthem.','הבן את מילות הספרדית של המנון ה-FIFA של שקירה.',
    'pRpeEdMmmQ0','song','culture',2,240,'🎵 Shakira'),
  v('es-c3','es','La Casa de Papel – Key Phrases Explained','ביטויים מ"בית הנייר" מוסברים',
    'Learn real Spanish used in the hit Netflix show Money Heist.','למד ספרדית אמיתית מהסדרה "בית הנייר".',
    'B_k5JoJD_hA','show','culture',3,600,'📺 Netflix'),
  v('es-c4','es','Spanish for Lovers – Romantic Phrases','ביטויים רומנטיים בספרדית',
    'Beautiful Spanish phrases used in love songs and movies.','ביטויים ספרדיים יפים משירי אהבה וסרטים.',
    '7nVoBgVq5BE','phrases','culture',2,480,'🎬 Cinema'),
  v('es-c5','es','Bella Ciao (Spanish Version) – Lyrics & Meaning','Bella Ciao (גרסה ספרדית) – מילים ומשמעות',
    'Sing along and understand the Spanish version of this iconic song.','שיר-עם וההבנה של הגרסה הספרדית של השיר האייקוני.',
    'Dn8vMXFaLkA','song','culture',2,180,'🎵 La Casa de Papel'),

  // ══════════════════════════════════════════════════════
  //  F R E N C H
  // ══════════════════════════════════════════════════════

  // — Lessons —
  v('fr-l1','fr','French for Beginners – Complete Course','צרפתית למתחילים – קורס מלא',
    'Start your French learning with this comprehensive beginner course.','התחל ללמוד צרפתית עם קורס מתחילים מקיף.',
    'MoH8Fk2K9bc','greetings','lesson',1,7200),
  v('fr-l2','fr','100 Most Common French Words','100 המילים הנפוצות ביותר בצרפתית',
    'Essential French vocabulary for everyday conversations.','אוצר מילים צרפתי חיוני לשיחות יומיומיות.',
    'VzPD009qTN4','vocabulary','lesson',1,840),
  v('fr-l3','fr','French Numbers 1–100','מספרים בצרפתית 1–100',
    'Learn to count in French with clear pronunciation.','למד לספור בצרפתית עם הגייה ברורה.',
    'qn_tkJDFXmA','numbers','lesson',1,420),
  v('fr-l4','fr','French Food & Restaurant Vocabulary','אוצר מילים של מסעדה בצרפתית',
    'Order food confidently in French restaurants.','הזמן אוכל בביטחון במסעדות צרפתיות.',
    'IlpQs-8cF_E','food','lesson',2,600),
  v('fr-l5','fr','French Colors & Descriptions','צבעים ותיאורים בצרפתית',
    'Learn all colors and how to describe things in French.','למד צבעים וכיצד לתאר דברים בצרפתית.',
    'Czt3sO6sMVw','colors','lesson',1,380),
  v('fr-l6','fr','French Travel Phrases','ביטויי נסיעה בצרפתית',
    'Essential phrases for visiting France and French-speaking countries.','ביטויים חיוניים לביקור בצרפת.',
    '0awJqkW_n2Y','travel','lesson',2,660),
  v('fr-l7','fr','French Family Vocabulary','מילות משפחה בצרפתית',
    'Family members and relationships in French.','בני משפחה ויחסים בצרפתית.',
    '9LvHb_OHW9I','family','lesson',1,480),
  v('fr-l8','fr','French Body Parts','חלקי גוף בצרפתית',
    'Learn body parts in French with pronunciation.','למד חלקי גוף בצרפתית עם הגייה.',
    'ht5bA59p5zs','body','lesson',1,420),

  // — Sentences —
  v('fr-s1','fr','50 French Sentences for Beginners','50 משפטים צרפתיים למתחילים',
    'The most useful short sentences in French for everyday life.','המשפטים הקצרים השימושיים ביותר בצרפתית לחיי יומיום.',
    'OfN8D3xGSTs','sentences','sentences',1,720),
  v('fr-s2','fr','French Dialogue – At the Café','דיאלוג צרפתי – בבית הקפה',
    'Real French conversation in a café with subtitles.','שיחה צרפתית אמיתית בבית קפה עם כתוביות.',
    'f_T_sqxFBl8','dialogue','sentences',2,540),
  v('fr-s3','fr','Learn French Through Short Stories','למד צרפתית דרך סיפורים קצרים',
    'Beginner-friendly French stories with slow narration.','סיפורים צרפתיים למתחילים עם קריינות איטית.',
    'OX0j8OiH2KA','stories','sentences',2,900),

  // — Culture —
  v('fr-c1','fr','Papaoutai – Stromae | French Lyrics Explained','Papaoutai – Stromae | מילות השיר מוסברות',
    'Learn French through Stromae\'s hit about fathers and family.','למד צרפתית דרך הלהיט של סטרומאה על אבות ומשפחה.',
    'oiKj0Z_Xnjc','song','culture',3,240,'🎵 Stromae'),
  v('fr-c2','fr','Alors On Danse – Stromae | French Song for Learning','Alors On Danse – Stromae | שיר צרפתי ללמידה',
    'Popular French-language song with vocabulary breakdown.','שיר בצרפתית פופולרי עם פירוט אוצר מילים.',
    'VHoT4N43jK8','song','culture',2,180,'🎵 Stromae'),
  v('fr-c3','fr','La Vie en Rose – Édith Piaf | Classic French Song','La Vie en Rose – אדית פיאף | שיר קלאסי',
    'Understand the lyrics of France\'s most iconic song.','הבן את מילות השיר הצרפתי האייקוני ביותר.',
    'rzeLynj1GYM','song','culture',2,210,'🎵 Édith Piaf'),
  v('fr-c4','fr','French Phrases from "Amélie" (Le Fabuleux Destin)','ביטויים מ"אמלי" הסרט הצרפתי',
    'Learn real Parisian French from the beloved movie Amélie.','למד צרפתית פריזאית אמיתית מהסרט האהוב "אמלי".',
    'ryDOy3gJ9Uw','movie','culture',3,480,'🎬 Amélie'),
  v('fr-c5','fr','French Expressions You Hear in Movies','ביטויים צרפתיים ששומעים בסרטים',
    '20 slang and colloquial expressions from French cinema.','20 ביטויי סלנג ושיח יומיומי מקולנוע צרפתי.',
    'I5RwKDMf-Lk','movie','culture',3,600,'🎬 Cinema'),

  // ══════════════════════════════════════════════════════
  //  G E R M A N
  // ══════════════════════════════════════════════════════

  // — Lessons —
  v('de-l1','de','German for Beginners – A1 Course','גרמנית למתחילים – קורס A1',
    'Complete A1 German course for absolute beginners.','קורס גרמנית A1 מלא למתחילים לחלוטין.',
    'YmaDws_uHGU','greetings','lesson',1,3600),
  v('de-l2','de','100 German Words for Beginners','100 מילים גרמניות למתחילים',
    'The most essential German vocabulary for beginners.','אוצר המילים הגרמני החיוני ביותר למתחילים.',
    'Gz7S3fVp8Cc','vocabulary','lesson',1,720),
  v('de-l3','de','German Numbers 1–100','מספרים בגרמנית 1–100',
    'Learn German numbers with perfect pronunciation.','למד מספרים בגרמנית עם הגייה מושלמת.',
    'ZJFMSXoEGQE','numbers','lesson',1,360),
  v('de-l4','de','German Food & Drink Vocabulary','אוצר מילים של אוכל בגרמנית',
    'Essential German words for food and eating out.','מילות אוכל חיוניות בגרמנית.',
    'pBhXUkgoLOQ','food','lesson',2,540),
  v('de-l5','de','German Travel Phrases','ביטויי נסיעה בגרמנית',
    'Useful German phrases for traveling in Germany.','ביטויים גרמניים שימושיים לנסיעה בגרמניה.',
    'ORuHCX9BTIM','travel','lesson',2,600),
  v('de-l6','de','German Colors & Adjectives','צבעים ותארים בגרמנית',
    'Learn colors and common adjectives in German.','למד צבעים ותארים נפוצים בגרמנית.',
    'nZJ6v-oDPgE','colors','lesson',1,380),
  v('de-l7','de','German Family Members','בני משפחה בגרמנית',
    'Family vocabulary with pronunciation in German.','אוצר מילים של משפחה עם הגייה בגרמנית.',
    'wV7LVGDvN0k','family','lesson',1,480),
  v('de-l8','de','German Days, Months & Time','ימים, חודשים וזמן בגרמנית',
    'Tell time and talk about dates in German.','אמור שעה ותאריכים בגרמנית.',
    'LVgBeB0dN3A','time','lesson',2,540),

  // — Sentences —
  v('de-s1','de','50 German Sentences for Everyday Life','50 משפטים גרמניים לחיי יומיום',
    'Short practical German sentences for beginners.','משפטים גרמניים קצרים ופרקטיים למתחילים.',
    'f7C4s7r6MFo','sentences','sentences',1,720),
  v('de-s2','de','German Conversation Practice – Daily Dialogues','תרגול שיחה גרמנית – דיאלוגים יומיומיים',
    'Real German dialogues at shop, café and street.','דיאלוגים גרמניים אמיתיים בחנות, בית קפה ורחוב.',
    'ORuHCX9BTIM','dialogue','sentences',2,600),
  v('de-s3','de','Learn German with Easy German – Street Interviews','למד גרמנית עם Easy German – ראיונות רחוב',
    'Native Germans answer simple questions on the street.','גרמנים ילידים עונים על שאלות פשוטות ברחוב.',
    'BMBoHba-sS0','stories','sentences',2,480),

  // — Culture —
  v('de-c1','de','99 Luftballons – Nena | German Classic Song','99 Luftballons – נֶנָה | שיר קלאסי גרמני',
    'Learn German through this iconic 80s anti-war anthem.','למד גרמנית דרך ההמנון הפציפיסטי האייקוני מהשנות ה-80.',
    'Fpu5a0Bl8eY','song','culture',2,240,'🎵 Nena'),
  v('de-c2','de','Alles Neu – Peter Fox | German Hip-Hop Explained','Alles Neu – פיטר פוקס | היפ-הופ גרמני מוסבר',
    'Learn German slang and street vocabulary from this Berlin hip-hop hit.','למד סלנג ואוצר מילים גרמני מלהיט הברלינאי.',
    'DEAD00000002','song','culture',3,240,'🎵 Peter Fox'),
  v('de-c3','de','German Phrases from "Dark" (Netflix)','ביטויים גרמניים מ"Dark" של Netflix',
    'Learn real German used in the acclaimed Netflix series Dark.','למד גרמנית אמיתית מהסדרה המצוינת Dark.',
    'Jzl5HV6fBkk','show','culture',3,540,'📺 Netflix Dark'),
  v('de-c4','de','Du Hast – Rammstein | German Rock Lyrics Explained','Du Hast – Rammstein | מילות רוק גרמני מוסברות',
    'Understand the famous German rock band Rammstein\'s iconic song.','הבן את השיר האייקוני של להקת הרוק הגרמנית.',
    'W3q8Od5qJio','song','culture',3,200,'🎵 Rammstein'),

  // ══════════════════════════════════════════════════════
  //  I T A L I A N
  // ══════════════════════════════════════════════════════

  // — Lessons —
  v('it-l1','it','Italian for Beginners – Complete Course','איטלקית למתחילים – קורס מלא',
    'Start learning Italian from scratch with this beginner course.','התחל ללמוד איטלקית מאפס.',
    'FNKwGO9VO44','greetings','lesson',1,3600),
  v('it-l2','it','100 Italian Words Every Beginner Needs','100 מילים איטלקיות שכל מתחיל צריך',
    'Most common Italian vocabulary for everyday use.','אוצר מילים איטלקי נפוץ לשימוש יומיומי.',
    '_EUi71l2rS0','vocabulary','lesson',1,780),
  v('it-l3','it','Italian Food & Restaurant Phrases','ביטויי מסעדה באיטלקית',
    'Order food like a local in Italian restaurants.','הזמן אוכל כמו מקומי במסעדות איטלקיות.',
    'qpPqlECHpAM','food','lesson',2,540),
  v('it-l4','it','Italian Numbers 1–100','מספרים באיטלקית 1–100',
    'Count to 100 in Italian with clear audio.','ספור עד 100 באיטלקית עם שמע ברור.',
    '5CZqBkIoEVM','numbers','lesson',1,400),
  v('it-l5','it','Italian Travel Phrases','ביטויי נסיעה באיטלקית',
    'Must-know phrases for your trip to Italy.','ביטויים חובה לטיול שלך לאיטליה.',
    'jOGRo0IXxbE','travel','lesson',2,600),
  v('it-l6','it','Italian Colors & Descriptions','צבעים ותיאורים באיטלקית',
    'Learn colors and how to describe things in Italian.','למד צבעים ולתאר דברים באיטלקית.',
    'HVaxHdYQO18','colors','lesson',1,360),
  v('it-l7','it','Italian Family Vocabulary','מילות משפחה באיטלקית',
    'Family members and relationship terms in Italian.','בני משפחה ומונחי יחסים באיטלקית.',
    '5jFOeAIjgmk','family','lesson',1,480),

  // — Sentences —
  v('it-s1','it','50 Italian Sentences for Beginners','50 משפטים איטלקיים למתחילים',
    'Short everyday Italian sentences with pronunciation.','משפטים איטלקיים יומיומיים קצרים עם הגייה.',
    'SX_ViTNgqFw','sentences','sentences',1,720),
  v('it-s2','it','Italian Daily Conversations – Beginner Dialogues','שיחות יומיומיות באיטלקית',
    'Real Italian dialogues for café, shop and street situations.','דיאלוגים איטלקיים אמיתיים לבית קפה, חנות ורחוב.',
    'ss_BmTGv4aU','dialogue','sentences',2,600),

  // — Culture —
  v('it-c1','it','Volare – Dean Martin | Italian Classic Song Explained','Volare – דין מרטין | שיר קלאסי איטלקי מוסבר',
    'Learn Italian through this timeless classic song.','למד איטלקית דרך השיר הקלאסי הנצחי הזה.',
    'Ij8GXMA3PwM','song','culture',2,210,'🎵 Dean Martin'),
  v('it-c2','it','Italian Phrases from "Cinema Paradiso"','ביטויים איטלקיים מ"קולנוע פרדיסו"',
    'Learn beautiful Italian from this Oscar-winning masterpiece.','למד איטלקית יפה מהמופת הזוכה באוסקר.',
    'vkKLEBdGMoM','movie','culture',3,480,'🎬 Cinema Paradiso'),
  v('it-c3','it','O Sole Mio – Learn Italian Through Classic Songs','O Sole Mio – למד איטלקית דרך שירים קלאסיים',
    'Understand the famous Neapolitan song with vocabulary breakdown.','הבן את השיר הנאפוליטני המפורסם עם פירוט מילים.',
    'lEp6k4XeLH0','song','culture',2,180,'🎵 Neapolitan Classic'),
  v('it-c4','it','Italian Slang from TV Shows','סלנג איטלקי מסדרות טלוויזיה',
    'Learn informal Italian expressions used in popular Italian shows.','למד ביטויי איטלקית לא רשמיים משימוש בסדרות פופולריות.',
    '8GrFdJFz9D4','show','culture',3,540,'📺 Italian TV'),

  // ══════════════════════════════════════════════════════
  //  P O R T U G U E S E
  // ══════════════════════════════════════════════════════

  // — Lessons —
  v('pt-l1','pt','Brazilian Portuguese for Beginners','פורטוגזית ברזילאית למתחילים',
    'Complete beginner course for Brazilian Portuguese.','קורס מתחילים מלא לפורטוגזית ברזילאית.',
    '1f-GH7PJNQA','greetings','lesson',1,3600),
  v('pt-l2','pt','100 Portuguese Words for Beginners','100 מילים פורטוגזיות למתחילים',
    'Essential Portuguese vocabulary for everyday conversations.','אוצר מילים פורטוגזי חיוני לשיחות יומיומיות.',
    'E0MIeQC5QaM','vocabulary','lesson',1,720),
  v('pt-l3','pt','Portuguese Food Vocabulary','אוצר מילים של אוכל בפורטוגזית',
    'Food words and phrases in Brazilian Portuguese.','מילות אוכל וביטויים בפורטוגזית ברזילאית.',
    'LZPXIPBpLEE','food','lesson',2,540),
  v('pt-l4','pt','Portuguese Numbers 1–100','מספרים בפורטוגזית 1–100',
    'Count to 100 in Brazilian Portuguese.','ספור עד 100 בפורטוגזית ברזילאית.',
    'x9aVKMbnbE0','numbers','lesson',1,420),
  v('pt-l5','pt','Portuguese Travel Phrases','ביטויי נסיעה בפורטוגזית',
    'Key phrases for traveling in Brazil and Portugal.','ביטויים עיקריים לנסיעה בברזיל ופורטוגל.',
    'OHrVP29dGD4','travel','lesson',2,600),
  v('pt-l6','pt','Portuguese Colors & Adjectives','צבעים ותארים בפורטוגזית',
    'Learn colors and descriptive words in Portuguese.','למד צבעים ומילות תיאור בפורטוגזית.',
    'GwYSVINEqX4','colors','lesson',1,360),

  // — Sentences —
  v('pt-s1','pt','50 Brazilian Portuguese Sentences','50 משפטים פורטוגזיים ברזילאיים',
    'Short sentences for everyday Brazilian Portuguese conversations.','משפטים קצרים לשיחות פורטוגזית ברזילאית יומיומיות.',
    'tPF-iimEGFI','sentences','sentences',1,720),
  v('pt-s2','pt','Portuguese Dialogue – At the Market','דיאלוג פורטוגזי – בשוק',
    'Practice real Brazilian Portuguese in market and shopping situations.','תרגל פורטוגזית ברזילאית אמיתית בסיטואציות שוק וקנייה.',
    'WY-LWPBLqH0','dialogue','sentences',2,480),

  // — Culture —
  v('pt-c1','pt','Garota de Ipanema – Learn Portuguese Through Music','Garota de Ipanema – למד פורטוגזית דרך מוזיקה',
    'The world\'s most famous Brazilian song with vocabulary explained.','השיר הברזילאי המפורסם בעולם עם הסבר אוצר מילים.',
    'UtF6Jej8yb4','song','culture',2,210,'🎵 João Gilberto'),
  v('pt-c2','pt','Brazilian Funk & Samba – Learn Portuguese Through Music','פונק סמבה ברזילאי – למד פורטוגזית',
    'Learn everyday Brazilian slang through popular music.','למד סלנג ברזילאי יומיומי דרך מוזיקה פופולרית.',
    '0q4LqpRJIio','song','culture',2,300,'🎵 Brazilian Pop'),
  v('pt-c3','pt','Portuguese Phrases from Brazilian Soap Operas','ביטויים פורטוגזיים מטלנובלות ברזילאיות',
    'Learn how real Brazilians speak from popular telenovelas.','למד כיצד ברזילאים אמיתיים מדברים מטלנובלות פופולריות.',
    'SuR4jlEi6Wk','show','culture',3,480,'📺 Telenovela'),

  // ══════════════════════════════════════════════════════
  //  J A P A N E S E
  // ══════════════════════════════════════════════════════

  // — Lessons —
  v('ja-l1','ja','Japanese for Beginners – Hiragana & Basics','יפנית למתחילים – הירגנה ויסודות',
    'Learn Japanese hiragana and basic vocabulary from scratch.','למד הירגנה יפנית ואוצר מילים בסיסי מאפס.',
    'jXed01R5tAk','greetings','lesson',1,3600),
  v('ja-l2','ja','100 Japanese Words for Beginners','100 מילים יפניות למתחילים',
    'Most important Japanese words to start speaking.','המילים היפניות החשובות ביותר להתחיל לדבר.',
    'QzFMdv0HPUI','vocabulary','lesson',1,720),
  v('ja-l3','ja','Japanese Numbers 1–100','מספרים ביפנית 1–100',
    'Learn to count in Japanese – both systems.','למד לספור ביפנית – שתי מערכות המספרים.',
    'ORehUqGSqPk','numbers','lesson',1,480),
  v('ja-l4','ja','Japanese Food Vocabulary','אוצר מילים של אוכל ביפנית',
    'Essential Japanese food words and ordering phrases.','מילות אוכל חיוניות וביטויי הזמנה ביפנית.',
    'W5fBnMcLmNI','food','lesson',2,540),
  v('ja-l5','ja','Japanese Travel Phrases','ביטויי נסיעה ביפנית',
    'Must-know Japanese for your trip to Japan.','יפנית חובה לטיול שלך ליפן.',
    'L29SRQHA0U8','travel','lesson',2,660),
  v('ja-l6','ja','Japanese Greetings & Polite Expressions','ברכות וביטויי נימוס ביפנית',
    'Master Japanese greetings and polite social expressions.','שלוט בברכות ביפנית וביטויי נימוס חברתיים.',
    'pZt0qkPmW0s','greetings','lesson',1,480),
  v('ja-l7','ja','Japanese Hiragana in 1 Hour','הירגנה יפנית בשעה אחת',
    'Learn to read all 46 hiragana characters quickly.','למד לקרוא את כל 46 התווים של הירגנה במהירות.',
    'hGZ8OuNBRJk','greetings','lesson',1,3600),

  // — Sentences —
  v('ja-s1','ja','50 Basic Japanese Sentences','50 משפטים יפניים בסיסיים',
    'Short essential sentences for daily Japanese life.','משפטים יפניים קצרים וחיוניים לחיי יומיום.',
    '1tAMfPVuBpE','sentences','sentences',1,720),
  v('ja-s2','ja','Japanese Phrases from Anime – Beginner Level','ביטויים יפניים מאנימה – רמת מתחיל',
    'Learn real Japanese sentences heard in popular anime shows.','למד משפטים יפניים אמיתיים ששומעים באנימה פופולרית.',
    'Mdh5OcNPQV8','anime','sentences',2,600),
  v('ja-s3','ja','Japanese Conversation Practice – Daily Situations','תרגול שיחה יפנית – מצבים יומיומיים',
    'Practice Japanese in realistic everyday situations.','תרגל יפנית במצבים יומיומיים ריאליסטיים.',
    'gdZLi9oWNZg','dialogue','sentences',2,540),

  // — Culture —
  v('ja-c1','ja','Lemon – Kenshi Yonezu | Japanese Song for Learning','Lemon – קנשי יונזו | שיר יפני ללמידה',
    'Learn Japanese through this massive J-Pop hit with lyrics explained.','למד יפנית דרך להיט הJ-Pop הענק הזה עם הסבר מילים.',
    'SX_ViT4Ra7k','song','culture',3,270,'🎵 Kenshi Yonezu'),
  v('ja-c2','ja','Yoru ni Kakeru – YOASOBI | Japanese Song Explained','Yoru ni Kakeru – YOASOBI | שיר יפני מוסבר',
    'Understand the lyrics of Japan\'s biggest recent J-Pop hit.','הבן את מילות הלהיט הJ-Pop הגדול ביותר של יפן לאחרונה.',
    'x8VYWazR5mE','song','culture',3,260,'🎵 YOASOBI'),
  v('ja-c3','ja','Naruto – Learn Japanese Through Anime','Naruto – למד יפנית דרך אנימה',
    'Key Japanese phrases and vocabulary from the anime Naruto.','ביטויים ואוצר מילים יפניים מהאנימה נארוטו.',
    'ss_BmTGv4aU','anime','culture',2,540,'📺 Naruto'),
  v('ja-c4','ja','Studio Ghibli Japanese – Phrases from Spirited Away','יפנית מסטודיו ג\'יבלי – ביטויים מ"העיר הקסומה"',
    'Beautiful Japanese phrases from Miyazaki\'s masterpiece.','ביטויים יפניים יפים ממופת של מיאזאקי.',
    'UBZb0rz4oEk','movie','culture',3,480,'🎬 Studio Ghibli'),

  // ══════════════════════════════════════════════════════
  //  K O R E A N
  // ══════════════════════════════════════════════════════

  // — Lessons —
  v('ko-l1','ko','Korean for Beginners – Hangul & Basics','קוריאנית למתחילים – הנגול ויסודות',
    'Learn the Korean alphabet (Hangul) and basic phrases.','למד את האלפבית הקוריאני (הנגול) וביטויים בסיסיים.',
    'hGZ8OuNBRJk','greetings','lesson',1,3600),
  v('ko-l2','ko','100 Korean Words for Beginners','100 מילים קוריאניות למתחילים',
    'Start speaking Korean with these essential words.','התחל לדבר קוריאנית עם המילים החיוניות.',
    'XolRGvSAn8w','vocabulary','lesson',1,720),
  v('ko-l3','ko','Korean Numbers 1–100 (Both Systems)','מספרים בקוריאנית 1–100 (שתי מערכות)',
    'Learn both Sino-Korean and Native Korean number systems.','למד את שתי מערכות המספרים הקוריאניות.',
    'lCfBIBkQl6E','numbers','lesson',2,540),
  v('ko-l4','ko','Korean Food Vocabulary & Restaurant Phrases','מילות אוכל וביטויי מסעדה בקוריאנית',
    'Essential Korean food words and how to order food.','מילות אוכל חיוניות וכיצד להזמין אוכל בקוריאנית.',
    'k5bXJzgJVHs','food','lesson',2,480),
  v('ko-l5','ko','Korean Travel Phrases','ביטויי נסיעה בקוריאנית',
    'Essential Korean phrases for visiting South Korea.','ביטויים קוריאניים חיוניים לביקור בקוריאה הדרומית.',
    '1tAMfPVuBpE','travel','lesson',2,600),
  v('ko-l6','ko','Korean Greetings & Politeness Levels','ברכות ורמות נימוס בקוריאנית',
    'Master Korean honorifics and formal/informal greetings.','שלוט בכבוד הקוריאני וברכות פורמליות/לא פורמליות.',
    'TJ2ifmkFCXU','greetings','lesson',1,540),

  // — Sentences —
  v('ko-s1','ko','50 Korean Sentences for Beginners','50 משפטים קוריאניים למתחילים',
    'Short practical Korean sentences for everyday life.','משפטים קוריאניים קצרים ופרקטיים לחיי יומיום.',
    'GwYSVINEqX4','sentences','sentences',1,720),
  v('ko-s2','ko','Korean Phrases from K-Dramas','ביטויים קוריאניים מסדרות K-Drama',
    'Learn the most common expressions from Korean TV dramas.','למד את הביטויים הנפוצים ביותר מסדרות טלוויזיה קוריאניות.',
    'gdZLi9oWNZg','dialogue','sentences',2,600),
  v('ko-s3','ko','Learn Korean with Short Conversations','למד קוריאנית עם שיחות קצרות',
    'Quick real-life Korean dialogue practice for beginners.','תרגול דיאלוג קוריאני מהיר מהחיים האמיתיים למתחילים.',
    'Mdh5OcNPQV8','dialogue','sentences',1,480),

  // — Culture —
  v('ko-c1','ko','Gangnam Style – PSY | Korean Song for Learning','Gangnam Style – PSY | שיר קוריאני ללמידה',
    'Learn Korean through the world\'s most viewed song with vocabulary breakdown.','למד קוריאנית דרך השיר הנצפה ביותר בעולם עם פירוט מילים.',
    '9bZkp7q19f0','song','culture',2,260,'🎵 PSY'),
  v('ko-c2','ko','BTS Dynamite – Korean Lyrics Explained','BTS Dynamite – מילות קוריאנית מוסברות',
    'Understand BTS vocabulary and Korean expressions in Dynamite.','הבן את אוצר המילים של BTS וביטויים קוריאניים ב-Dynamite.',
    'gdZLi9oWNZg','song','culture',2,200,'🎵 BTS'),
  v('ko-c3','ko','Korean Phrases from "Squid Game"','ביטויים קוריאניים מ"משחק הדיונון"',
    'Learn real Korean used in Netflix\'s hit series Squid Game.','למד קוריאנית אמיתית מהסדרה המצליחה של Netflix.',
    'TJ2ifmkFCXU','show','culture',3,540,'📺 Squid Game'),
  v('ko-c4','ko','BLACKPINK – Learn Korean Through K-Pop','BLACKPINK – למד קוריאנית דרך K-Pop',
    'Korean vocabulary and phrases from BLACKPINK\'s popular songs.','אוצר מילים וביטויים קוריאניים משירי BLACKPINK הפופולריים.',
    'ioNng23DkIM','song','culture',2,240,'🎵 BLACKPINK'),
  v('ko-c5','ko','Crash Landing on You – Korean Drama Phrases','ביטויים מ"נחיתת אונס אצלך"',
    'Learn romantic and everyday Korean from this beloved K-drama.','למד קוריאנית רומנטית ויומיומית מה-K-drama האהוב הזה.',
    'XolRGvSAn8w','show','culture',3,480,'📺 Netflix K-Drama'),

  // ══════════════════════════════════════════════════════
  //  R U S S I A N
  // ══════════════════════════════════════════════════════

  // — Lessons —
  v('ru-l1','ru','Russian for Beginners – Cyrillic & Basics','רוסית למתחילים – קירילית ויסודות',
    'Learn the Cyrillic alphabet and start speaking Russian.','למד את האלפבית הקירילי והתחל לדבר רוסית.',
    'AvhkNkjVJCg','greetings','lesson',1,3600),
  v('ru-l2','ru','100 Russian Words for Beginners','100 מילים רוסיות למתחילים',
    'Essential Russian vocabulary for beginners.','אוצר מילים רוסי חיוני למתחילים.',
    'IBD9VDgaBZY','vocabulary','lesson',1,780),
  v('ru-l3','ru','Russian Numbers 1–100','מספרים ברוסית 1–100',
    'Learn to count in Russian with pronunciation.','למד לספור ברוסית עם הגייה.',
    'AIvMgVAcNkU','numbers','lesson',1,420),
  v('ru-l4','ru','Russian Travel Phrases','ביטויי נסיעה ברוסית',
    'Essential Russian phrases for travelers.','ביטויים רוסיים חיוניים למטיילים.',
    'pCjU1IXhMl0','travel','lesson',2,600),
  v('ru-l5','ru','Russian Food Vocabulary','אוצר מילים של אוכל ברוסית',
    'Food words and restaurant phrases in Russian.','מילות אוכל וביטויי מסעדה ברוסית.',
    'zLrPVBPJHm4','food','lesson',2,540),
  v('ru-l6','ru','Russian Colors & Adjectives','צבעים ותארים ברוסית',
    'Learn colors and common descriptive words in Russian.','למד צבעים ומילות תיאור נפוצות ברוסית.',
    'vYWzWVdaGxU','colors','lesson',1,360),

  // — Sentences —
  v('ru-s1','ru','50 Russian Sentences for Beginners','50 משפטים רוסיים למתחילים',
    'Short practical Russian sentences for everyday use.','משפטים רוסיים קצרים ופרקטיים לשימוש יומיומי.',
    'tPF-iimEGFI','sentences','sentences',1,720),
  v('ru-s2','ru','Russian Dialogue – Everyday Conversations','דיאלוג רוסי – שיחות יומיומיות',
    'Practice real Russian conversations for daily situations.','תרגל שיחות רוסיות אמיתיות למצבים יומיומיים.',
    'WY-LWPBLqH0','dialogue','sentences',2,600),

  // — Culture —
  v('ru-c1','ru','Kalinka – Famous Russian Folk Song Explained','Kalinka – שיר עם רוסי מפורסם מוסבר',
    'Learn Russian through this beloved traditional folk song.','למד רוסית דרך שיר העם המסורתי האהוב הזה.',
    'IBD9VDgaBZY','song','culture',2,180,'🎵 Russian Folk'),
  v('ru-c2','ru','Russian Phrases from "The Americans"','ביטויים רוסיים מ"האמריקאים"',
    'Learn real Russian spy vocabulary and phrases from the TV show.','למד אוצר מילים רוסי אמיתי של מרגלים מהסדרה.',
    'AIvMgVAcNkU','show','culture',3,480,'📺 The Americans'),
  v('ru-c3','ru','Leningrad – Famous Russian Rock Song','Leningrad – שיר רוק רוסי מפורסם',
    'Learn informal Russian slang through this popular rock song.','למד סלנג רוסי לא רשמי דרך שיר הרוק הפופולרי הזה.',
    'AvhkNkjVJCg','song','culture',3,220,'🎵 Leningrad'),

  // ══════════════════════════════════════════════════════
  //  C H I N E S E  (Mandarin)
  // ══════════════════════════════════════════════════════

  // — Lessons —
  v('zh-l1','zh','Chinese (Mandarin) for Beginners','סינית (מנדרינית) למתחילים',
    'Start learning Mandarin Chinese from absolute zero.','התחל ללמוד סינית מנדרינית מאפס מוחלט.',
    'vL3UWdmjVig','greetings','lesson',1,3600),
  v('zh-l2','zh','100 Chinese Words for Beginners','100 מילים סיניות למתחילים',
    'Most common Mandarin words with tones.','מילות מנדרינית נפוצות עם טונים.',
    'l-7bBJsS1sE','vocabulary','lesson',1,720),
  v('zh-l3','zh','Chinese Numbers 1–100','מספרים בסינית 1–100',
    'Learn to count in Mandarin Chinese.','למד לספור בסינית מנדרינית.',
    'M3h9RfFM2Fo','numbers','lesson',1,420),
  v('zh-l4','zh','Chinese Food Vocabulary','אוצר מילים של אוכל בסינית',
    'Essential Chinese words for food and dining.','מילות אוכל ואכילה חיוניות בסינית.',
    'WFcaXGLmZhA','food','lesson',2,540),
  v('zh-l5','zh','Chinese Travel Phrases','ביטויי נסיעה בסינית',
    'Key Mandarin phrases for visiting China.','ביטויים עיקריים במנדרינית לביקור בסין.',
    'GwYSVINEqX4','travel','lesson',2,600),
  v('zh-l6','zh','Chinese Tones Explained for Beginners','הסבר הטונים הסיניים למתחילים',
    'Master the four Mandarin tones with clear examples.','שלוט בארבעת הטונים המנדריניים עם דוגמאות ברורות.',
    'a7T7e7WEFNk','greetings','lesson',1,480),

  // — Sentences —
  v('zh-s1','zh','50 Chinese Sentences for Beginners','50 משפטים סיניים למתחילים',
    'Short practical Mandarin sentences for everyday use.','משפטים מנדריניים קצרים ופרקטיים לשימוש יומיומי.',
    'zLrPVBPJHm4','sentences','sentences',1,720),
  v('zh-s2','zh','Chinese Conversations – Daily Dialogue Practice','שיחות סיניות – תרגול דיאלוג יומיומי',
    'Practice real Mandarin conversations for everyday situations.','תרגל שיחות מנדריניות אמיתיות למצבים יומיומיים.',
    'vYWzWVdaGxU','dialogue','sentences',2,600),

  // — Culture —
  v('zh-c1','zh','月亮代表我的心 – Learn Chinese Through Classic Song','月亮代表我的心 – למד סינית דרך שיר קלאסי',
    'The Moon Represents My Heart – Teresa Teng\'s most famous song.','הירח מייצג את לבי – השיר המפורסם ביותר של טרזה טנג.',
    '51xS4yXbryc','song','culture',2,210,'🎵 Teresa Teng'),
  v('zh-c2','zh','Chinese Phrases from "Meteor Garden"','ביטויים סיניים מ"גן המטאורים"',
    'Learn everyday Mandarin from the popular Asian drama series.','למד מנדרינית יומיומית מהסדרה הדרמטית האסייתית הפופולרית.',
    'WFcaXGLmZhA','show','culture',3,480,'📺 Asian Drama'),
  v('zh-c3','zh','Jay Chou – Learn Chinese Through C-Pop','Jay Chou – למד סינית דרך C-Pop',
    'Learn Mandarin vocabulary through Jay Chou\'s famous songs.','למד אוצר מילים במנדרינית דרך השירים המפורסמים של Jay Chou.',
    'l-7bBJsS1sE','song','culture',2,240,'🎵 Jay Chou'),

  // ══════════════════════════════════════════════════════
  //  T U R K I S H
  // ══════════════════════════════════════════════════════

  // — Lessons —
  v('tr-l1','tr','Turkish for Beginners – Complete Course','טורקית למתחילים – קורס מלא',
    'Learn Turkish from scratch with this complete course.','למד טורקית מאפס עם קורס מלא.',
    'fOQoLDqhBiU','greetings','lesson',1,3600),
  v('tr-l2','tr','100 Turkish Words for Beginners','100 מילים טורקיות למתחילים',
    'Most essential Turkish vocabulary for daily use.','אוצר המילים הטורקי החיוני ביותר לשימוש יומיומי.',
    'R7aJY5hFP4Y','vocabulary','lesson',1,720),
  v('tr-l3','tr','Turkish Travel Phrases','ביטויי נסיעה בטורקית',
    'Essential Turkish for visiting Turkey.','טורקית חיונית לביקור בטורקיה.',
    'Q9YjHJZUbAI','travel','lesson',2,600),
  v('tr-l4','tr','Turkish Numbers 1–100','מספרים בטורקית 1–100',
    'Learn to count in Turkish.','למד לספור בטורקית.',
    '6A5zQ2mSxKU','numbers','lesson',1,420),
  v('tr-l5','tr','Turkish Food Vocabulary','אוצר מילים של אוכל בטורקית',
    'Essential Turkish food and restaurant vocabulary.','אוצר מילים טורקי חיוני של אוכל ומסעדה.',
    'pFH7oBmwxAU','food','lesson',2,540),
  v('tr-l6','tr','Turkish Colors & Adjectives','צבעים ותארים בטורקית',
    'Learn colors and common descriptive words in Turkish.','למד צבעים ומילות תיאור נפוצות בטורקית.',
    'HmTi0kYIiHY','colors','lesson',1,360),

  // — Sentences —
  v('tr-s1','tr','50 Turkish Sentences for Beginners','50 משפטים טורקיים למתחילים',
    'Short practical Turkish sentences for everyday conversations.','משפטים טורקיים קצרים ופרקטיים לשיחות יומיומיות.',
    'Q9YjHJZUbAI','sentences','sentences',1,720),
  v('tr-s2','tr','Turkish Daily Dialogues – Real Conversations','דיאלוגים טורקיים יומיומיים – שיחות אמיתיות',
    'Practice real Turkish conversations at café, shop and home.','תרגל שיחות טורקיות אמיתיות בבית קפה, חנות ובית.',
    'fOQoLDqhBiU','dialogue','sentences',2,600),

  // — Culture —
  v('tr-c1','tr','Şımarık (Kiss Kiss) – Tarkan | Turkish Pop Song','שימאריק – Tarkan | שיר פופ טורקי',
    'Learn Turkish through Tarkan\'s internationally famous pop song.','למד טורקית דרך שיר הפופ הבינלאומי המפורסם של טארקאן.',
    '5w3C_hOMaRc','song','culture',2,210,'🎵 Tarkan'),
  v('tr-c2','tr','Turkish Phrases from "Diriliş: Ertuğrul"','ביטויים טורקיים מ"ארטוגרול"',
    'Learn Ottoman-influenced Turkish from the hit historical series.','למד טורקית בהשפעת עות\'מאנית מהסדרה ההיסטורית המצליחה.',
    'R7aJY5hFP4Y','show','culture',3,540,'📺 Ertuğrul'),
  v('tr-c3','tr','Turkish Love Songs – Romantic Phrases','שירי אהבה טורקיים – ביטויים רומנטיים',
    'Beautiful Turkish romantic expressions from popular love songs.','ביטויים רומנטיים טורקיים יפים משירי אהבה פופולריים.',
    'HmTi0kYIiHY','song','culture',2,300,'🎵 Turkish Pop'),

  // ══════════════════════════════════════════════════════
  //  A R A B I C
  // ══════════════════════════════════════════════════════

  // — Lessons —
  v('ar-l1','ar','Arabic for Beginners – Alphabet & Basics','ערבית למתחילים – אלפבית ויסודות',
    'Learn the Arabic alphabet and essential phrases from scratch.','למד את האלפבית הערבי וביטויים חיוניים מאפס.',
    'arplhdr0001','greetings','lesson',1,3600),
  v('ar-l2','ar','100 Arabic Words for Beginners','100 מילים ערביות למתחילים',
    'The most essential Modern Standard Arabic vocabulary.','אוצר המילים הערבי החיוני ביותר בערבית ספרותית.',
    'arplhdr0002','vocabulary','lesson',1,720),
  v('ar-l3','ar','Arabic Numbers 1–100','מספרים בערבית 1–100',
    'Count to 100 in Arabic with clear pronunciation.','ספור עד 100 בערבית עם הגייה ברורה.',
    'arplhdr0003','numbers','lesson',1,420),
  v('ar-l4','ar','Arabic Food Vocabulary','אוצר מילים של אוכל בערבית',
    'Essential Arabic words for food and dining out.','מילות אוכל ואכילה חיוניות בערבית.',
    'arplhdr0004','food','lesson',2,540),
  v('ar-l5','ar','Arabic Travel Phrases','ביטויי נסיעה בערבית',
    'Key Arabic phrases for visiting Arabic-speaking countries.','ביטויים ערביים עיקריים לנסיעה בארצות ערביות.',
    'arplhdr0005','travel','lesson',2,600),
  v('ar-l6','ar','Arabic Greetings & Daily Expressions','ברכות וביטויים יומיומיים בערבית',
    'Master the most important Arabic greetings and social phrases.','שלוט בברכות הערביות החשובות ביותר וביטויים חברתיים.',
    'arplhdr0006','greetings','lesson',1,480),

  // — Sentences —
  v('ar-s1','ar','50 Arabic Sentences for Beginners','50 משפטים ערביים למתחילים',
    'Short practical Arabic sentences for everyday use.','משפטים ערביים קצרים ופרקטיים לשימוש יומיומי.',
    'arplhdr0007','sentences','sentences',1,720),
  v('ar-s2','ar','Arabic Daily Conversations – Real Dialogues','שיחות יומיומיות בערבית – דיאלוגים אמיתיים',
    'Practice real Arabic conversations for everyday life situations.','תרגל שיחות ערביות אמיתיות למצבים יומיומיים.',
    'arplhdr0008','dialogue','sentences',2,600),

  // — Culture —
  v('ar-c1','ar','Fairuz – Learn Arabic Through Lebanese Music','פירוז – למד ערבית דרך מוזיקה לבנונית',
    'Understand the beautiful lyrics of Fairuz, the greatest Arab singer.','הבן את המילים היפות של פירוז, הזמרת הערבית הגדולה ביותר.',
    'arplhdr0009','song','culture',2,300,'🎵 Fairuz'),
  v('ar-c2','ar','Amr Diab – Learn Egyptian Arabic Through Pop Music','עמרו דיאב – למד ערבית מצרית דרך מוזיקת פופ',
    'Learn Egyptian Arabic vocabulary through the King of Mediterranean music.','למד אוצר מילים בערבית מצרית דרך מלך המוזיקה הים-תיכונית.',
    'arplhdr0010','song','culture',2,240,'🎵 Amr Diab'),
  v('ar-c3','ar','Arabic Phrases from Popular Egyptian Films','ביטויים ערביים מסרטים מצריים פופולריים',
    'Learn everyday Egyptian Arabic from classic and modern films.','למד ערבית מצרית יומיומית מסרטים קלאסיים ומודרניים.',
    'arplhdr0011','movie','culture',3,480,'🎬 Egyptian Cinema'),
]

export function getVideosByLanguage(lang: string): Video[] {
  return VIDEO_DATA.filter((v) => v.language === lang)
}

export function getVideosByContentType(lang: string, contentType: 'lesson' | 'sentences' | 'culture'): Video[] {
  return VIDEO_DATA.filter((v) => v.language === lang && v.content_type === contentType)
}

export function getVideosByCategory(lang: string, category: string): Video[] {
  if (category === 'all') return getVideosByLanguage(lang)
  return VIDEO_DATA.filter((v) => v.language === lang && v.category === category)
}
