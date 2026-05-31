/* ═══════════════════════════════════
   STATE
═══════════════════════════════════ */
const S={
  characters:[null,null],
  charCount:null,age:null,skin:null,body:null,
  hairColor1:null,hairstyle:null,
  eyeColor:null,eyeShape:null,
  clothing:null,clothingColor:null,
  clothingTop:null,clothingTopColor:null,
  clothingBottom:null,clothingBottomColor:null,
  clothingAcc:[],clothingAccColor:null,clothingCondition:[],bodyParts:[],
  sockColor:null,sockLength:null,shoes:null,shoeColor:null,faceAcc:[],faceAccColor:null,
  nsfwTop:null,nsfwTopColor:null,
  nsfwBottom:null,nsfwBottomColor:null,
  nsfwClothing:null,nsfwClothingColor:null,
  expression:null,poses:[],actions:[],effects:[],liquids:[],
  weapons:[],props:[],electronics:[],otherItems:[],
  environment:null,style:null,era:null,animeStudio:null,colorGrade:null,
  stroke:null,shadow:null,quality:[],lights:[],glow:null,smooth:null,
  angle:null,shot:null,look:null,lens:null,lensEffect:null,
  negatives:[],negBody:[],negQuality:[],
  nsfwBody:[],nsfwTop:null,nsfwBottom:null,nsfwClothing:[],nsfwCondition:[],nsfwPose:[],nsfwFluid:[],nsfwObjects:[],
  nsfwEnv:[],nsfwIndicator:[],nsfwShot:[],
  nsfw:false,
  weights:{},
  extraPos:[],extraNeg:[],
  favourites:[],
  locked:{},   /* bp-cell IDs that are locked → keys frozen */
};

/* ═══════════════════════════════════
   AUTH HELPERS
═══════════════════════════════════ */
function isLoggedIn(){ return !!(window._currentUser); }

function showLoginPrompt(){
  const loginBtn = document.getElementById('loginBtn');
  if(loginBtn){
    loginBtn.classList.add('login-pulse');
    setTimeout(()=>loginBtn.classList.remove('login-pulse'),1500);
  }
  toast('🔒 Sign in to save characters to your library');
}

/* ═══════════════════════════════════
   COLOR DATA
═══════════════════════════════════ */
const HAIR_COLORS=[
  // Enhanced vibrant colors with better contrast
  {id:'white',   n:'White',    l:'#ffffff',m:'#f5f5f5',d:'#d9d9d9', fg:'#1a1a2e'},
  {id:'silver',  n:'Silver',   l:'#f0f0f0',m:'#d0d0d0',d:'#a0a0a0', fg:'#1a1a2e'},
  {id:'blonde',  n:'Blonde',   l:'#fef0aa',m:'#ffd700',d:'#cc8800', fg:'#1a1a2e'},
  {id:'gold',    n:'Gold',     l:'#ffdd00',m:'#ffbb00',d:'#cc6600', fg:'#1a1a2e'},
  {id:'peach',   n:'Peach',    l:'#ffccaa',m:'#ffb366',d:'#ff8c42', fg:'#1a1a2e'},
  {id:'coral',   n:'Coral',    l:'#ff9999',m:'#ff6347',d:'#ff4500', fg:'#1a1a2e'},
  {id:'red',     n:'Red',      l:'#ff5252',m:'#d93636',d:'#8b0000', fg:'#f0f4ff'},
  {id:'auburn',  n:'Auburn',   l:'#d4836a',m:'#9a3412',d:'#431407', fg:'#f0f4ff'},
  {id:'pink',    n:'Pink',     l:'#ff89dd',m:'#ff69b4',d:'#d6367d', fg:'#1a1a2e'},
  {id:'lavender',n:'Lavender', l:'#e6b3ff',m:'#c299ff',d:'#a855f7', fg:'#1a1a2e'},
  {id:'purple',  n:'Purple',   l:'#d8a8ff',m:'#b366ff',d:'#7b2cbf', fg:'#1a1a2e'},
  {id:'magenta', n:'Magenta',  l:'#ff00ff',m:'#dd1c88',d:'#b8005c', fg:'#1a1a2e'},
  {id:'blue',    n:'Blue',     l:'#66d9ff',m:'#1e90ff',d:'#0047ab', fg:'#1a1a2e'},
  {id:'indigo',  n:'Indigo',   l:'#c7d2fe',m:'#4338ca',d:'#1e1b4b', fg:'#1a1a2e'},
  {id:'cyan',    n:'Cyan',     l:'#00ffff',m:'#00e5e5',d:'#0088cc', fg:'#1a1a2e'},
  {id:'teal',    n:'Teal',     l:'#20d9a3',m:'#009688',d:'#004d40', fg:'#1a1a2e'},
  {id:'mint',    n:'Mint',     l:'#66ffaa',m:'#00ff88',d:'#00cc66', fg:'#1a1a2e'},
  {id:'green',   n:'Green',    l:'#66ff99',m:'#00d084',d:'#008c45', fg:'#1a1a2e'},
  {id:'brown',   n:'Brown',    l:'#9b7d5c',m:'#6d4e3f',d:'#3d2817', fg:'#1a1a2e'},
  {id:'black',   n:'Black',    l:'#4a4a4a',m:'#1a1a1a',d:'#000000', fg:'#f0f4ff'}
];
const EYE_COLORS=[
  {id:'blue',     n:'Blue',     l:'#66d9ff',m:'#1e90ff',d:'#0047ab'},
  {id:'green',    n:'Green',    l:'#66ffaa',m:'#00d084',d:'#008c45'},
  {id:'brown',    n:'Brown',    l:'#9b7d5c',m:'#6d4e3f',d:'#3d2817'},
  {id:'purple',   n:'Purple',   l:'#d8a8ff',m:'#b366ff',d:'#7b2cbf'},
  {id:'violet',   n:'Violet',   l:'#ee82ee',m:'#9400d3',d:'#4b0082'},
  {id:'silver',   n:'Silver',   l:'#f0f0f0',m:'#d0d0d0',d:'#a0a0a0'},
  {id:'red',      n:'Red',      l:'#ff5252',m:'#d93636',d:'#8b0000'},
  {id:'gold',     n:'Gold',     l:'#ffdd00',m:'#ffbb00',d:'#cc6600'},
  {id:'pink',     n:'Pink',     l:'#ff89dd',m:'#ff69b4',d:'#d6367d'},
  {id:'cyan',     n:'Cyan',     l:'#00ffff',m:'#00e5e5',d:'#0088cc'},
  {id:'jade',     n:'Jade',     l:'#66ffaa',m:'#00ff88',d:'#00cc66'},
  {id:'amber',    n:'Amber',    l:'#ffdd00',m:'#ffaa00',d:'#cc6600'},
  {id:'grey',     n:'Grey',     l:'#d3d3d3',m:'#a9a9a9',d:'#696969'},
  {id:'teal',     n:'Teal',     l:'#20d9a3',m:'#009688',d:'#004d40'},
  {id:'emerald',  n:'Emerald',  l:'#50c878',m:'#00a854',d:'#006838'},
  {id:'sapphire', n:'Sapphire', l:'#0f52ba',m:'#0047ab',d:'#001f87'},
  {id:'white',    n:'White',    l:'#ffffff',m:'#f5f5f5',d:'#d9d9d9'},
  {id:'black',    n:'Black',    l:'#4a4a4a',m:'#1a1a1a',d:'#000000'},
  {id:'coral',    n:'Coral',    l:'#ff8a65',m:'#ff5722',d:'#ff4500'},
  {id:'rainbow',  n:'Rainbow',  l:'#fce7f3',m:'#a855f7',d:'#6d28d9'}
];
const SKINS=[
  {lbl:'Fair/Pale', val:'fair skin',   bg:'#fde4cc',fg:'#3d1a0a'},
  {lbl:'Light',     val:'light skin',  bg:'#f5cba0',fg:'#3d1a0a'},
  {lbl:'Medium',    val:'medium skin', bg:'#d4956a',fg:'#150800'},
  {lbl:'Tan',       val:'tan skin',    bg:'#b07040',fg:'#fff3e0'},
  {lbl:'Deep',      val:'deep skin',   bg:'#7a4828',fg:'#ffe8d0'},
  {lbl:'Dark',      val:'dark skin',   bg:'#3c1a0a',fg:'#ffd0a8'}
];

/* ═══════════════════════════════════
   BLUEPRINT CELLS
═══════════════════════════════════ */
const BP_CELLS=[
  {id:'bp-char',   icon:'fa-users',      lbl:'Character', keys:['characters','age','skin','body','hairColor1','hairstyle','eyeColor','eyeShape','nsfwBody']},
  {id:'bp-outfit', icon:'fa-shirt',      lbl:'Outfit',    keys:['clothing','clothingTop','clothingBottom','clothingAcc','clothingCondition','nsfwCondition','shoes','sockLength','sockColor','shoeColor','faceAcc','nsfwTop','nsfwBottom','nsfwClothing']},
  {id:'bp-mood',   icon:'fa-face-smile', lbl:'Mood',      keys:['expression','poses','actions','effects','liquids','nsfwPose','nsfwFluid','nsfwIndicator']},
  {id:'bp-tools',  icon:'fa-box-open',   lbl:'Objects',   keys:['weapons','props','electronics','otherItems','nsfwObjects']},
  {id:'bp-style',  icon:'fa-paintbrush', lbl:'Style',     keys:['style','animeStudio','colorGrade','era','stroke','shadow','glow','smooth']},
  {id:'bp-scene',  icon:'fa-mountain-sun',lbl:'Scene',    keys:['environment','nsfwEnv']},
  {id:'bp-camera', icon:'fa-camera',     lbl:'Camera',    keys:['angle','shot','look','lens','lensEffect','nsfwShot','bodyParts']},
  {id:'bp-quality',icon:'fa-sparkles',   lbl:'Quality',   keys:['quality','lights']}
];

/* ═══════════════════════════════════
   OPTION DATA
   nsfw:true → hidden until NSFW on, shown red
═══════════════════════════════════ */

const CLOTHING_ITEMS=[
  // ── CASUAL ──
  {label:'Casual Streetwear',               gender:'fm', cat:'casual'},
  {label:'Sporty Outfit',                   gender:'fm', cat:'casual'},
  {label:'Athleisure',                      gender:'fm', cat:'casual'},
  {label:'Tracksuit',                       gender:'fm', cat:'casual'},
  {label:'Sleepwear / Pajamas',             gender:'fm', cat:'casual'},
  {label:'Y2K Outfit',                      gender:'f',  cat:'casual'},
  {label:'E-girl Outfit',                   gender:'f',  cat:'casual'},
  {label:'Cottagecore Dress',               gender:'f',  cat:'casual'},
  {label:'Sundress',                        gender:'f',  cat:'casual'},
  {label:'Shirt Dress',                     gender:'f',  cat:'casual'},
  {label:'Wrap Dress',                      gender:'f',  cat:'casual'},
  {label:'Bodycon Dress',                   gender:'f',  cat:'casual'},
  {label:'Dark Academia',                   gender:'fm', cat:'casual'},
  {label:'Gothic Outfit',                   gender:'fm', cat:'casual'},
  {label:'Punk Outfit',                     gender:'fm', cat:'casual'},
  {label:'Harajuku Style',                  gender:'fm', cat:'casual'},
  {label:'Streetwear Set',                  gender:'m',  cat:'casual'},
  {label:'Tank Top & Shorts',               gender:'m',  cat:'casual'},
  // ── SCHOOL ──
  {label:'School Uniform',                  gender:'fm', cat:'school'},
  {label:'Sailor Uniform',                  gender:'f',  cat:'school'},
  {label:'Blazer School Uniform',           gender:'fm', cat:'school'},
  {label:'Seifuku',                         gender:'f',  cat:'school'},
  {label:'Pleated Mini Skirt Uniform',      gender:'f',  cat:'school'},
  {label:'Very Short School Skirt',         gender:'f',  cat:'school'},
  {label:'Exposed Midriff School Uniform',  gender:'f',  cat:'school'},
  // ── UNIFORM ──
  {label:'Business Office Suit',            gender:'fm', cat:'uniform'},
  {label:'Corporate Blazer Set',            gender:'fm', cat:'uniform'},
  {label:'Bank Teller Uniform',             gender:'fm', cat:'uniform'},
  {label:'Hotel Staff Uniform',             gender:'fm', cat:'uniform'},
  {label:'Flight Attendant Uniform',        gender:'fm', cat:'uniform'},
  {label:'Pilot Uniform',                   gender:'fm', cat:'uniform'},
  {label:'Chef Uniform',                    gender:'fm', cat:'uniform'},
  {label:'Doctor Coat',                     gender:'fm', cat:'uniform'},
  {label:'Nurse Uniform',                   gender:'f',  cat:'uniform'},
  {label:'Police Uniform',                  gender:'fm', cat:'uniform'},
  {label:'Military Uniform',                gender:'fm', cat:'uniform'},
  {label:'Security Guard Uniform',          gender:'fm', cat:'uniform'},
  {label:'Firefighter Gear',                gender:'fm', cat:'uniform'},
  {label:'Postal Worker Uniform',           gender:'fm', cat:'uniform'},
  {label:'Sports Jersey',                   gender:'fm', cat:'uniform'},
  // ── FORMAL ──
  {label:'Little Black Dress',              gender:'f',  cat:'formal'},
  {label:'Cocktail Dress',                  gender:'f',  cat:'formal'},
  {label:'Evening Gown',                    gender:'f',  cat:'formal'},
  {label:'Ball Gown',                       gender:'f',  cat:'formal'},
  {label:'Prom Dress',                      gender:'f',  cat:'formal'},
  {label:'Wedding Dress',                   gender:'f',  cat:'formal'},
  {label:'Bridesmaid Dress',                gender:'f',  cat:'formal'},
  {label:'Qipao / Cheongsam',               gender:'f',  cat:'formal'},
  {label:'Red Carpet Gown',                 gender:'f',  cat:'formal'},
  {label:'Business Suit',                   gender:'m',  cat:'formal'},
  {label:'Formal Tuxedo',                   gender:'m',  cat:'formal'},
  {label:'Dress Shirt & Tie',               gender:'m',  cat:'formal'},
  {label:'Three-Piece Suit',                gender:'m',  cat:'formal'},
  {label:'Black Tie Formal',                gender:'fm', cat:'formal'},
  {label:'Gala Outfit',                     gender:'fm', cat:'formal'},
  {label:'Diplomatic Attire',               gender:'fm', cat:'formal'},
  {label:'Wedding Guest Outfit',            gender:'fm', cat:'formal'},
  // ── JAPANESE ──
  {label:'Magical Girl',                    gender:'f',  cat:'japanese'},
  {label:'Idol Outfit',                     gender:'f',  cat:'japanese'},
  {label:'Gothic Lolita',                   gender:'f',  cat:'japanese'},
  {label:'Sweet Lolita',                    gender:'f',  cat:'japanese'},
  {label:'Classic Lolita',                  gender:'f',  cat:'japanese'},
  {label:'Maid Outfit',                     gender:'f',  cat:'japanese'},
  {label:'Shrine Maiden / Miko',            gender:'f',  cat:'japanese'},
  {label:'Kimono',                          gender:'fm', cat:'japanese'},
  {label:'Furisode Kimono',                 gender:'f',  cat:'japanese'},
  {label:'Yukata',                          gender:'fm', cat:'japanese'},
  {label:'Haori',                           gender:'fm', cat:'japanese'},
  {label:'Ninja Outfit',                    gender:'fm', cat:'japanese'},
  // ── FANTASY ──
  {label:'Fantasy Armor',                   gender:'fm', cat:'fantasy'},
  {label:'Elven Outfit',                    gender:'f',  cat:'fantasy'},
  {label:'Witch Costume',                   gender:'f',  cat:'fantasy'},
  {label:'Fairy Outfit',                    gender:'f',  cat:'fantasy'},
  {label:'Vampire Dress',                   gender:'f',  cat:'fantasy'},
  {label:'Princess Dress',                  gender:'f',  cat:'fantasy'},
  {label:'Warrior Costume',                 gender:'fm', cat:'fantasy'},
  {label:'Knight Armor',                    gender:'m',  cat:'fantasy'},
  {label:'Wizard Robe',                     gender:'fm', cat:'fantasy'},
  {label:'Cyberpunk Outfit',                gender:'fm', cat:'fantasy'},
  {label:'Steampunk Outfit',                gender:'fm', cat:'fantasy'},
  // ── ANIMAL ──
  {label:'Cat Girl Outfit',                 gender:'f',  cat:'animal'},
  {label:'Fox Girl Outfit',                 gender:'f',  cat:'animal'},
  {label:'Bunny Girl Suit',                 gender:'f',  cat:'animal'},
  {label:'Wolf Girl Outfit',                gender:'f',  cat:'animal'},
  {label:'Dog Girl Outfit',                 gender:'f',  cat:'animal'},
  {label:'Horse Girl Outfit',               gender:'f',  cat:'animal'},
  {label:'Cow Girl Costume',                gender:'f',  cat:'animal'},
  {label:'Bear Kigurumi',                   gender:'fm', cat:'animal'},
  {label:'Panda Kigurumi',                  gender:'fm', cat:'animal'},
  {label:'Rabbit Kigurumi',                 gender:'fm', cat:'animal'},
  {label:'Wolf Costume',                    gender:'m',  cat:'animal'},
  {label:'Animal Hoodie Onesie',            gender:'fm', cat:'animal'},
  // ── SWIM ──
  {label:'One-Piece Swimsuit',              gender:'f',  cat:'swim'},
  {label:'High-Cut Swimsuit',               gender:'f',  cat:'swim'},
  {label:'Bikini',                          gender:'f',  cat:'swim'},
  {label:'String Bikini',                   gender:'f',  cat:'swim'},
  {label:'Sports Swimwear',                 gender:'fm', cat:'swim'},
  {label:'Rash Guard',                      gender:'fm', cat:'swim'},
  {label:'Swim Trunks',                     gender:'m',  cat:'swim'},
  // ── CULTURAL ──
  {label:'Hanbok (Korean)',                  gender:'fm', cat:'cultural'},
  {label:'Ao Dai (Vietnamese)',              gender:'f',  cat:'cultural'},
  {label:'Sari (Indian)',                    gender:'f',  cat:'cultural'},
  {label:'Abaya',                            gender:'f',  cat:'cultural'},
  {label:'Dirndl (German)',                  gender:'f',  cat:'cultural'},
  {label:'Kilt (Scottish)',                  gender:'m',  cat:'cultural'},
  // ── NSFW (hidden until NSFW mode) ──
  {label:'Bunny Suit',                      gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Nurse Outfit',                    gender:'f',  cat:'nsfw', nsfw:true},
  {label:'French Maid',                     gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Cheerleader',                     gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Schoolgirl Costume',              gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Stewardess Costume',              gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Secretary Outfit',                gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Cat Maid',                        gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Micro Bikini',                    gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Brazilian Bikini',                gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Thong Bikini',                    gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Wet Bikini',                      gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Lingerie',                        gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Babydoll',                        gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Lace Lingerie',                   gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Bra & Panties',                   gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Corset & Stockings',              gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Pasties Only',                    gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Body Stocking',                   gender:'f',  cat:'nsfw', nsfw:true},
  {label:'See-through',                     gender:'fm', cat:'nsfw', nsfw:true},
  {label:'No Bra',                          gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Panties Visible',                 gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Skirt Lifted',                    gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Micro Skirt',                     gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Crotchless Outfit',               gender:'f',  cat:'nsfw', nsfw:true},
  {label:'Latex Bodysuit',                  gender:'fm', cat:'nsfw', nsfw:true},
  {label:'PVC Outfit',                      gender:'fm', cat:'nsfw', nsfw:true},
  {label:'Harness',                         gender:'fm', cat:'nsfw', nsfw:true},
  {label:'Bondage Outfit',                  gender:'fm', cat:'nsfw', nsfw:true},
  {label:'Catsuit',                         gender:'fm', cat:'nsfw', nsfw:true},
];

/* ── NSFW Clothing Enhanced Prompts ──
   label → prompt مُحسَّن يُرسل للموديل بدلاً من الـ label العادي ── */
const NSFW_CLOTHING_PROMPTS = {
  'bunny suit':         'sexy bunny suit, strapless leotard, fishnet stockings, bunny ears, revealing outfit',
  'nurse outfit':       'sexy nurse costume, micro mini skirt nurse uniform, cleavage, revealing slutty nurse',
  'police costume':     'sexy police costume, micro mini skirt, tight low-cut uniform, revealing slutty cop outfit',
  'french maid':        'sexy french maid dress, micro mini skirt, lace apron, fishnet stockings, revealing maid outfit',
  'cheerleader':        'sexy cheerleader outfit, tiny pleated skirt, tight midriff top, revealing cheerleader uniform',
  'schoolgirl costume': 'sexy schoolgirl costume, micro plaid mini skirt, thigh-high stockings, unbuttoned blouse, revealing uniform',
  'stewardess costume': 'sexy flight attendant costume, micro mini skirt, tight low-cut blouse, revealing stewardess outfit',
  'secretary outfit':   'sexy secretary outfit, tight micro pencil skirt, low-cut blouse, revealing office wear',
  'cat maid':           'sexy cat maid outfit, micro mini skirt, cat ears, fishnet stockings, revealing maid dress',
  'micro bikini':       'micro bikini, barely covering nipples and crotch, string ties, extremely revealing swimwear',
  'brazilian bikini':   'brazilian cut bikini, bare buttocks exposed, thong back, revealing swimwear',
  'thong bikini':       'thong bikini bottom, bare buttocks, string thong, extremely revealing',
  'wet bikini':         'soaking wet bikini, see-through wet fabric, clinging to body, wet look',
  'lingerie':           'sexy lace lingerie, revealing intimate wear, see-through fabric, underwear only',
  'babydoll':           'babydoll lingerie, sheer transparent fabric, revealing short nightgown',
  'lace lingerie':      'sheer lace lingerie, see-through lace, revealing delicate intimate wear',
  'bra & panties':      'matching lace bra and panties, revealing underwear set',
  'corset & stockings': 'tight corset, thigh-high stockings with garter belt, revealing lingerie set',
  'pasties only':       'nipple pasties only, bare body, only pasties covering nipples, exposed',
  'body stocking':      'sheer mesh body stocking, see-through full body suit, transparent',
  'see-through':        'see-through sheer clothing, transparent fabric, visible nipples, sheer material',
  'no bra':             'braless, no bra, nipples visible through shirt, free-breasted under clothing',
  'panties visible':    'panties clearly visible, upskirt view, exposed underwear, skirt lifted',
  'skirt lifted':       'skirt lifted up high, exposed panties, upskirt, revealing underneath',
  'micro skirt':        'extremely micro mini skirt, barely covers crotch, maximum thigh exposure',
  'crotchless outfit':  'crotchless panties, open crotch, exposed genitals, crotchless design',
  'latex bodysuit':     'skintight latex bodysuit, shiny rubber second skin, form-fitting latex',
  'pvc outfit':         'shiny PVC outfit, wet-look vinyl, glossy tight plastic clothing',
  'harness':            'leather body harness, straps across breasts and body, BDSM harness',
  'bondage outfit':     'BDSM bondage outfit, leather restraint straps, bondage clothing',
  'catsuit':            'skin-tight catsuit, form-fitting spandex bodysuit, second skin suit',
};


const D={
  charCount:{
    lbl:['1 Girl','1 Man','2 Girls','2 Men','1 Girl + 1 Man','3+ Girls','3+ Men','Mixed Group'],
    val:['1girl','1man','2girls','2men','1girl, 1man','3girls','3men','multiple characters'],
    k:'charCount'
  },
  age:{lbl:['Toddler (0–3)','Child (4–8)','Preteen (9–12)','Teen (13–17)','Young Adult (18–25)','Adult (26–35)','Middle-Aged (36–50)','Elderly (51+)'],val:['toddler','child','preteen','teen','young adult','adult','middle-aged','elderly'],k:'age'},
  gender:{lbl:['Feminine','Masculine','Androgynous'],val:['feminine','masculine','androgynous'],k:'gender'},
  body:{lbl:['Petite','Slim','Athletic','Toned','Curvy','Hourglass','Muscular','Chubby','Tall','Short'],val:['petite body','slim body','athletic body','toned body','curvy body','hourglass figure','muscular body','chubby body','tall figure','short figure'],k:'body'},
  hairstyle:{
    female:['Long Straight','Long Wavy','Long Curly','Twin Tails','High Ponytail','Low Ponytail','Side Ponytail','Braid','Double Braid','Fishtail Braid','Bun','Messy Bun','Top Knot','Half-Up Half-Down','Side Swept','Hime Cut','Blunt Bob','Short Bob','Pixie Cut','Wispy Bangs','Fluffy','Crimped','Ringlets'],
    male:  ['Short Straight','Short Spiky','Swept Back','Undercut','Side Part','Slicked Back','Crew Cut','Buzz Cut','Mohawk','Fauxhawk','Shaggy','Tousled','Long Flowing','Man Bun','Top Knot','Ponytail','Braid','Dreadlocks','Afro','Bald','Stubble','Undercut Fade','Textured Crop'],
    shared:['Short Straight','Long Straight','Long Wavy','Braid','Bun','Top Knot','Ponytail','Short Bob'],
    k:'hairstyle'
  },
  eyeShape:{lbl:['Large Round','Almond','Upturned','Downturned','Cat-like','Doe Eyes','Hooded'],k:'eyeShape'},
  clothingTop:{
    female:['Crop Top','Tied Crop Top','Off-Shoulder Top','Tube Top','Halter Top','Ribbed Top','Ruffle Top','Corset Top','Bralette','Wrap Top','Bardot Top'],
    male:  ['Polo Shirt','Henley Shirt','Muscle Tee','Athletic Shirt','Dress Shirt','Flannel Shirt','Rugby Shirt'],
    shared:['T-Shirt','Tank Top','Sleeveless Top','Long Sleeve Shirt','Button-Up Shirt','Oversized Shirt','Graphic Tee','Hoodie','Zip-Up Hoodie','Oversized Hoodie','Sweatshirt'],
    k:'clothingTop'
  },
  clothingBottom:{
    female:['Leggings','Pleated Skirt','Mini Skirt','Plaid Skirt','Long Skirt','Denim Skirt','Pencil Skirt','Flared Skirt','Wrap Skirt','High-Waist Shorts','Yoga Pants'],
    male:  ['Dress Pants','Chinos','Track Pants','Gym Shorts','Swim Trunks','Spa Shorts','Board Shorts','Boxers'],
    shared:['Jeans','Skinny Jeans','Wide-Leg Jeans','Ripped Jeans','Shorts','Denim Shorts','Jogger Pants','Sweatpants','Cargo Pants'],
    k:'clothingBottom'
  },
  nsfwTop:{lbl:['Tiny Top','Strapless Bra Top','Micro Crop Top','Open Back Top','Sheer Top','Fishnet Top','Cutout Top','Exposed Midriff Top'],k:'nsfwTop',nsfw:true},
  nsfwBottom:{lbl:['Micro Miniskirt','Booty Shorts','Thong','Garter Belt','Slit Skirt','Fishnet Stockings','Lace Shorts','Crotchless Shorts'],k:'nsfwBottom',nsfw:true},
  clothing:{ female:[], male:[], shared:[], k:'clothing' },
  clothingAcc:{lbl:['— Belts & Waist —','Belt','Chain Belt','Obi Sash','Suspenders','— Neckwear —','Choker','Necklace','Collar','Neck Ribbon','Bow Tie','Necktie','— Arms —','Cape','Shawl','Arm Warmers','Elbow Gloves','Short Gloves','Fingerless Gloves','Wrist Cuffs','— Bags —','Backpack','Crossbody Bag','Handbag','— Misc —','Ribbon Bow','Apron','Brooch','Scarf','Bandana'],arr:'clothingAcc'},
  bodyParts:{lbl:['Penis (Male)','Vagina','Anus','Nipples','Breasts','Cleavage','Bare Legs','Bare Midriff'],arr:'bodyParts',nsfw:true},
  sockColor:{lbl:['White','Light Gray','Gray','Dark Gray','Black','Pink','Hot Pink','Red','Crimson','Maroon','Peach','Orange','Yellow','Gold','Mint','Green','Dark Green','Olive','Teal','Cyan','Sky Blue','Light Blue','Blue','Navy','Indigo','Lavender','Purple','Violet','Magenta','Beige','Brown','Dark Brown','Silver','Striped','Plaid','Sheer'],k:'sockColor'},
  sockLength:{lbl:['No Socks','Ankle Socks','Knee-High Socks','Thigh-High Socks','Over-Knee Socks','Tights / Pantyhose','Fishnet Tights'],k:'sockLength'},
  shoes:{lbl:['— Casual —','Sneakers','Slip-On Shoes','Loafers','Canvas Shoes','— Formal —','School Shoes','Oxford Shoes','Mary Janes','Ballet Flats','— Heels —','Low Heels','Kitten Heels','Stiletto Heels','Wedge Heels','Platform Heels','— Boots —','Ankle Boots','Chelsea Boots','Knee-High Boots','Over-Knee Boots','Combat Boots','Rain Boots','— Open —','Sandals','Flip Flops','Slides','Gladiator Sandals','— Other —','Barefoot'],k:'shoes'},
  shoeColor:{lbl:['White','Light Gray','Gray','Dark Gray','Black','Pink','Hot Pink','Red','Crimson','Maroon','Orange','Yellow','Gold','Green','Dark Green','Olive','Teal','Sky Blue','Light Blue','Blue','Navy','Indigo','Lavender','Purple','Violet','Magenta','Beige','Brown','Dark Brown','Silver'],k:'shoeColor'},
  clothingColor:{lbl:['White','Light Gray','Gray','Dark Gray','Black','Pink','Hot Pink','Red','Crimson','Maroon','Peach','Orange','Yellow','Gold','Mint','Green','Dark Green','Olive','Teal','Cyan','Sky Blue','Light Blue','Blue','Navy','Indigo','Lavender','Purple','Violet','Magenta','Beige','Brown','Dark Brown','Silver','Striped','Plaid','Sheer'],k:'clothingColor'},
  clothingTopColor:{lbl:['White','Light Gray','Gray','Dark Gray','Black','Pink','Hot Pink','Red','Crimson','Maroon','Peach','Orange','Yellow','Gold','Mint','Green','Dark Green','Olive','Teal','Cyan','Sky Blue','Light Blue','Blue','Navy','Indigo','Lavender','Purple','Violet','Magenta','Beige','Brown','Dark Brown','Silver','Striped','Plaid','Sheer'],k:'clothingTopColor'},
  clothingBottomColor:{lbl:['White','Light Gray','Gray','Dark Gray','Black','Pink','Hot Pink','Red','Crimson','Maroon','Peach','Orange','Yellow','Gold','Mint','Green','Dark Green','Olive','Teal','Cyan','Sky Blue','Light Blue','Blue','Navy','Indigo','Lavender','Purple','Violet','Magenta','Beige','Brown','Dark Brown','Silver','Striped','Plaid','Sheer'],k:'clothingBottomColor'},
  nsfwTopColor:{lbl:['White','Light Gray','Gray','Dark Gray','Black','Pink','Hot Pink','Red','Crimson','Peach','Orange','Yellow','Gold','Mint','Green','Teal','Sky Blue','Light Blue','Blue','Navy','Lavender','Purple','Violet','Magenta','Beige','Brown','Silver','Striped','Sheer'],k:'nsfwTopColor'},
  nsfwBottomColor:{lbl:['White','Light Gray','Gray','Dark Gray','Black','Pink','Hot Pink','Red','Crimson','Peach','Orange','Yellow','Gold','Mint','Green','Teal','Sky Blue','Light Blue','Blue','Navy','Lavender','Purple','Violet','Magenta','Beige','Brown','Silver','Striped','Sheer'],k:'nsfwBottomColor'},
  nsfwClothingColor:{lbl:['White','Light Gray','Gray','Dark Gray','Black','Pink','Hot Pink','Red','Crimson','Peach','Orange','Yellow','Gold','Mint','Green','Teal','Sky Blue','Light Blue','Blue','Navy','Lavender','Purple','Violet','Magenta','Beige','Brown','Silver','Striped','Sheer'],k:'nsfwClothingColor'},
  faceAcc:{lbl:['— Glasses —','Glasses','Sunglasses','Round Glasses','Cat-Eye Glasses','Monocle','Goggles','— Head —','Headband','Flower Crown','Tiara','Crown','Halo','Hair Clip','Hair Pin','Cat Ears Headband','— Face —','Eye Patch','Blindfold','Face Mask','Masquerade Mask','Face Paint','Beauty Mark','— Fantasy —','Animal Ears','Fox Ears','Cat Ears','Dog Ears','Elf Ears','Demon Horns','Horns','Antlers','— Veils —','Veil','Wedding Veil'],arr:'faceAcc'},
  expression:{lbl:['Happy','Gentle Smile','Shy','Confident','Sad','Crying','Angry','Shocked','Tired','Dreamy','Mysterious','Seductive','Scared','Laughing','Stoic','Playful'],k:'expression'},
  pose:{lbl:['Standing','Sitting','Lying Down','Crouching','Kneeling','Dancing','Jumping','Running','Floating','Stretching','Fighting Stance','Eating','Drinking','Reading','Sleeping'],arr:'poses'},
  effects:{lbl:['Sparkles','Electricity','Fire','Water Splash','Ice Crystals','Smoke','Magical Aura','Particles','Cherry Blossoms','Stars','Lightning','Energy Orbs'],arr:'effects'},
  liquids:{lbl:['Sweat','Tears','Rain-Soaked','Glistening','Dew Drops','Wet Hair','Body Oil','Dripping Water','Blood','Glitter'],arr:'liquids'},
  weapons:{lbl:['Sword','Katana','Dagger','Axe','Spear','Bow & Arrow','Crossbow','Pistol','Rifle','Shotgun','Sniper','Machine Gun','Magic Staff','Magic Wand','Scythe','Hammer','Shield','Grenade','Bazooka','Twin Blades'],arr:'weapons'},
  props:{lbl:['Guitar','Microphone','Violin','Book','Briefcase','Umbrella','Rose','Lantern','Camera','Medical Kit','Potion Bottle','Treasure Chest','Rope','Candle','Teddy Bear','Lollipop','Fan','Broom','Fishing Rod','Letter/Envelope'],arr:'props'},
  electronics:{lbl:['Smartphone','Tablet','Laptop','Gaming Controller','Headphones','Digital Camera','TV Remote','Smart Watch','VR Headset','Drone'],arr:'electronics'},
  otherItems:{lbl:['Crown','Scepter','Mask','Mirror','Hourglass','Scroll','Map','Compass','Bomb','Flag'],arr:'otherItems'},
  environment:{lbl:['School','Rooftop','Beach','Forest','City Street','Cherry Blossom Park','Fantasy Realm','Bedroom','Café','Mountains','Desert','Space','Castle','Night City','Onsen'],k:'environment'},
  style:{lbl:['Anime','Manga / Ink','Digital Painting','Oil Painting','Watercolor','Fantasy Art','Chibi','Retro 90s Anime','Pixel Art','16-bit Pixel Art','32-bit Pixel Art','Sprite Art','Voxel Art','Low Poly','Flat Design','Vector Art','Sketch / Pencil','Cel Shading','Painterly','Concept Art'],k:'style'},
  era:{lbl:['1980s','1990s','2000s','2010s','2020s'],k:'era'},
  animeStudio:{lbl:[
    'Studio Ghibli style','Makoto Shinkai style','Kyoto Animation style','Ufotable style',
    'MAPPA style','Trigger style','Gainax style','Madhouse style',
    'Demon Slayer style','Attack on Titan style','Naruto style','Dragon Ball style',
    'Sailor Moon style','Evangelion style','Akira style','Your Name style'
  ],k:'animeStudio'},
  colorGrade:{lbl:['Pastel Palette','Vibrant / Saturated','HDR Colors','Muted / Desaturated','Black & White','Warm Tones','Cool Tones','Dark Ink','Neon Palette','Vintage / Faded','Duotone','Monochrome Blue','Monochrome Red','Golden Hour Tones','Cyberpunk Colors','Earthy Tones'],k:'colorGrade'},
  stroke:{lbl:['No Outline','Thin Lines','Medium Lines','Thick Lines','Bold Lines','Soft Edges'],k:'stroke'},
  shadow:{lbl:['No Shadows','Soft Shadows','Medium Shadows','Hard Shadows','Dramatic'],k:'shadow'},
  quality:{lbl:['Masterpiece','Best Quality','Ultra Detailed','Sharp Focus','4K','8K','Professional','Cinematic','High Resolution','Award-Winning'],arr:'quality'},
  light:{lbl:['Studio Light','Natural Light','Rim Light','Backlight','Neon Light','Moonlight','Candlelight','Sunlight','Golden Hour','Soft Diffused'],arr:'lights'},
  glow:{lbl:['No Glow','Soft Glow','Warm Glow','Golden Glow','Ethereal Glow','Magical Glow'],k:'glow'},
  smooth:{lbl:['Normal','Smooth Skin','Porcelain','Silky','Textured'],k:'smooth'},
  angle:{lbl:['Eye Level','Low Angle','High Angle',"Bird's Eye",'Side Profile','Over Shoulder'],k:'angle'},
  shot:{lbl:['Extreme Closeup','Face Closeup','Headshot','Bust Shot','Waist Up','Full Body','Full Environment'],k:'shot'},
  look:{lbl:['At Viewer','Down','Up','Away','To the Side','Eyes Closed'],k:'look'},
  lens:{lbl:['Standard','Wide Angle','Telephoto','Fisheye','Macro','85mm Portrait'],k:'lens'},
  lensEffect:{lbl:['None','Bokeh / Blurred BG','Depth of Field','Soft Focus','Focus Face','Focus Body'],k:'lensEffect'},
  negBody:{lbl:['Bad Anatomy','Deformed Hands','Mutated Fingers','Extra Fingers','Missing Fingers','Extra Limbs','Floating Limbs','Deformed Legs','Missing Legs','Extra Legs','Bad Feet','Disconnected Body','Ugly Face','Weird Proportions','Duplicate Character'],arr:'negBody'},
  negQuality:{lbl:['Blurry','Low Quality','JPEG Artifacts','Artifacts','Noise/Grain','Overexposed','Underexposed','Watermark/Text','Cropped','Out of Frame','Flat Colors','Washed Out'],arr:'negQuality'},
  /* NSFW — inline with SFW, hidden until nsfw active */
  nsfwBody:{lbl:['Large Breasts','Small Breasts','Huge Breasts','Big Butt','Slim Waist','Thick Thighs','Curvy Hips','Topless','Nude','Naked','Visible Areolas','Erect Nipples'],arr:'nsfwBody',nsfw:true},
  clothingCondition:{lbl:['— Damage —','Torn','Ripped','Burned','Battle-Damaged','— Dirty —','Dirty','Muddy','Sandy','Blood-Stained','Paint-Splattered','— Wet —','Wet','Soaked','Rain-Drenched','Sweat-Drenched','— Other —','Wrinkled','Disheveled','Loosened','Partially Removed'],arr:'clothingCondition'},
  nsfwCondition:{lbl:['Semen-Stained','Cum-Covered','Cum Dripping','Urine-Stained','Fecal-Stained','Feces-Covered','Defecating','Sweat-Soaked','Milk-Stained'],arr:'nsfwCondition',nsfw:true},
  nsfwClothing:{lbl:[
    '— Role-Play —',
    'Bunny Suit','Nurse Outfit','Police Costume','French Maid','Cheerleader',
    'Schoolgirl Costume','Stewardess Costume','Secretary Outfit','Cat Maid',
    '— Swimwear —',
    'Micro Bikini','Brazilian Bikini','Thong Bikini','Wet Bikini',
    '— Lingerie —',
    'Lingerie','Babydoll','Lace Lingerie','Bra & Panties',
    'Corset & Stockings','Pasties Only','Body Stocking',
    '— Revealing —',
    'See-through','No Bra','Panties Visible','Skirt Lifted','Micro Skirt','Crotchless Outfit',
    '— Fetish —',
    'Latex Bodysuit','PVC Outfit','Harness','Bondage Outfit','Catsuit'
  ],arr:'nsfwClothing',nsfw:true},
  actions:{lbl:[
    '— Daily Life —','Eating food','Drinking coffee','Reading a book','Typing on laptop','Talking on phone','Listening to music','Cooking','Shopping','Studying','Playing video games','Watching TV',
    '— Outdoors —','Running','Jumping','Kicking a ball','Riding a bicycle','Skateboarding','Swimming','Stretching','Doing yoga','Training at gym','Playing tennis',
    '— Social —','Walking a dog','Taking a selfie','Dancing','Singing','Playing guitar','Painting','Writing in journal','Hugging','Waving hello','Having a picnic',
    '— Action & Combat —','Drawing a sword','Casting a spell','Aiming a bow','Throwing a shuriken','Blocking an attack','Leaping into battle','Firing a gun','Running from danger',
    '— Other —','Injecting with syringe','Holding umbrella in rain','Picking flowers','Sitting by window','Looking at the sky','Sleeping','Waking up','Bathing'
  ],arr:'actions'},
  nsfwPose:{lbl:[
    '— Positions —',
    'On All Fours','Doggy Style','Missionary','Cowgirl','Reverse Cowgirl',
    'Mating Press','Prone Bone','Standing','Against Wall','Lotus Position',
    'Spoon Position','Pile Driver','Leg Lock','Suspended Congress',
    '— Acts —',
    'Oral','Blowjob','Cunnilingus','Anal','Riding','Double Penetration',
    'Gangbang','Threesome','Facial','Creampie',
    '— Poses —',
    'Spread Legs','Spread Eagle','Legs Up','Bent Over','Kneeling',
    'Sitting On Face','Squatting','On Back Legs Open',
    '— BDSM —',
    'Tied Up','Tied Spread Eagle','Suspended','Collared & Leashed',
    'Blindfolded','Gagged','Spanked',
    '— Self ——',
    'Fingering','Self-Touching','Masturbating','Inserting Toy','Using Vibrator'
  ],arr:'nsfwPose',nsfw:true},
  nsfwFluid:{lbl:['Cum','Cum on Face','Cum on Body','Cum Inside','Dripping','Wet/Soaked','Body Oil','Sweat Droplets','Vaginal Fluid','Urine/Squirt','Feces (Scat)','Anal Fluid','Milk/Lactation'],arr:'nsfwFluid',nsfw:true},
  nsfwEnv:{lbl:['In Bed','Bathroom','Shower','Locker Room','Sex Dungeon','Glory Hole','Public Outdoor','Hotel Room','Adult Club','Onsen Bath'],arr:'nsfwEnv',nsfw:true},
  nsfwIndicator:{lbl:['Diaper (Baby)','Female Diaper','Semen Stain','Urine Stain','Fecal Stain','Sanitary Pad','Female Discharge','Anal Plug','Vibrator','Dildo','Sex Toy','Collar & Leash','Handcuffs/BDSM'],arr:'nsfwIndicator',nsfw:true},
  nsfwObjects:{lbl:[
    '— Body Parts —','Finger','Two Fingers','Three Fingers','Whole Hand','Fist',
    '— Toys —','Dildo','Strap-On','Vibrator','Wand Vibrator','Anal Plug','Cock Ring','Double-Ended Dildo',
    '— Restraint —','Rope / Bondage Rope','Handcuffs','Spreader Bar','Collar & Leash','Nipple Clamps','Blindfold','Gag Ball',
    '— Medical —','Syringe / Injection','Enema',
    '— Misc —','Condom','Lube Bottle','Whipped Cream','Honey','Sex Toy'
  ],arr:'nsfwObjects',nsfw:true},
  nsfwShot:{lbl:['Crotch Shot','Upskirt','Closeup Vagina','Closeup Penis','Closeup Anus','Closeup Nipples','Closeup Breasts','Between Legs','Panty Shot','Nude Macro'],arr:'nsfwShot',nsfw:true}
};

/* ═══════════════════════════════════
   BLUEPRINT BUILD
═══════════════════════════════════ */
/* ── Lock helpers ── */
function isLocked(bpId){
  return !!(S.locked && S.locked[bpId]);
}
function isKeyLocked(key){
  return BP_CELLS.some(function(c){
    return c.keys.includes(key) && isLocked(c.id);
  });
}
function isGridLocked(gid){
  /* Check if any bp-cell owns this grid's key */
  return BP_CELLS.some(function(c){
    if(!isLocked(c.id)) return false;
    return c.keys.some(function(k){
      var ids = _keyToGridIds(k);
      return ids.indexOf(gid) > -1;
    });
  });
}
function toggleLock(bpId){
  if(!S.locked) S.locked={};
  if(S.locked[bpId]){
    delete S.locked[bpId];
  } else {
    S.locked[bpId]=true;
  }
  _updateLockUI(bpId);
}
function _updateLockUI(bpId){
  var cell = document.getElementById(bpId);
  if(!cell) return;
  var locked = isLocked(bpId);
  cell.classList.toggle('bp-locked', locked);
  var lockEl = cell.querySelector('.bp-lock');
  if(lockEl) lockEl.style.display = locked ? '' : 'none';
  /* Dim/undim buttons in locked grids */
  var bpCell = BP_CELLS.find(function(c){ return c.id===bpId; });
  if(bpCell){
    bpCell.keys.forEach(function(k){
      var gids = _keyToGridIds(k);
      gids.forEach(function(gid){
        var g = document.getElementById(gid); if(!g) return;
        g.querySelectorAll('.ob,.cb,.sb').forEach(function(b){
          b.style.pointerEvents = locked ? 'none' : '';
          b.style.opacity       = locked ? '0.35' : '';
          b.style.cursor        = locked ? 'not-allowed' : '';
        });
        /* Lock indicator on the grid itself */
        g.dataset.locked = locked ? '1' : '';
      });
    });
  }
}
function _keyToGridIds(key){
  var map={
    age:'ageGrid', skin:'skinGrid', body:'bodyGrid',
    characters:'charCardsRow',
    hairColor1:'hairstyleGrid', hairstyle:'hairstyleGrid',
    eyeColor:'eyeShapeGrid',    eyeShape:'eyeShapeGrid',
    clothing:'clothingGrid',
    clothingTop:'clothingTopGrid', clothingBottom:'clothingBottomGrid',
    clothingAcc:'clothingAccGrid', clothingCondition:'clothingConditionGrid',
    faceAcc:'faceAccGrid',
    shoes:'shoesGrid',      shoeColor:'shoesGrid',
    sockLength:'sockLengthGrid', sockColor:'sockLengthGrid',
    expression:'expressionGrid', poses:'poseGrid',
    effects:'effectsGrid',       liquids:'liquidsGrid',
    weapons:'weaponGrid', props:'propsGrid',
    electronics:'electronicsGrid', otherItems:'otherItemsGrid',
    environment:'envGrid',
    style:'styleGrid', animeStudio:'animeStudioGrid', colorGrade:'colorGradeGrid',
    era:'eraGrid', stroke:'strokeGrid', shadow:'shadowGrid',
    glow:'glowGrid', smooth:'smoothGrid',
    angle:'angleGrid', shot:'shotGrid', look:'lookGrid',
    lens:'lensGrid',   lensEffect:'lensEffectGrid',
    quality:'qualityGrid', lights:'lightGrid',
    /* NSFW */
    nsfwBody:'nsfwBodyGrid',
    nsfwTop:'nsfwTopGrid',         nsfwBottom:'nsfwBottomGrid',
    nsfwClothing:'nsfwClothingGrid',
    nsfwPose:'nsfwPoseGrid',       nsfwFluid:'nsfwFluidGrid',
    nsfwEnv:'nsfwEnvGrid',         nsfwShot:'nsfwShotGrid',
    nsfwIndicator:'nsfwIndicatorGrid'
  };
  var gid = map[key];
  return gid ? [gid] : [];
}

function buildBlueprint(){
  const g=document.getElementById('bpGrid');
  if(!g) return;
  g.innerHTML='';
  const gridWrapper=document.createElement('div');
  gridWrapper.className='bp-grid';
  const CELLS12=[
    {id:'bp-char',   icon:'fa-users',          lbl:'Character'},
    {id:'bp-look',   icon:'fa-glasses',        lbl:'Look'},
    {id:'bp-outfit', icon:'fa-shirt',          lbl:'Outfit'},
    {id:'bp-layers', icon:'fa-layer-group',    lbl:'Layers'},
    {id:'bp-pose',   icon:'fa-person-running', lbl:'Pose'},
    {id:'bp-mood',   icon:'fa-face-smile',     lbl:'Mood'},
    {id:'bp-tools',  icon:'fa-box-open',       lbl:'Objects'},
    {id:'bp-style',  icon:'fa-paintbrush',     lbl:'Style'},
    {id:'bp-scene',  icon:'fa-mountain-sun',   lbl:'Scene'},
    {id:'bp-camera', icon:'fa-camera',         lbl:'Camera'},
    {id:'bp-quality',icon:'fa-sparkles',       lbl:'Quality'},
    {id:'bp-neg',    icon:'fa-ban',            lbl:'Avoid'}
  ];
  CELLS12.forEach(function(c){
    const cell=document.createElement('div');
    cell.className='bp-cell'; cell.id=c.id;
    cell.innerHTML='<i class="fas '+c.icon+'"></i><span class="bp-lbl">'+c.lbl+'</span><span class="bp-tick">✓</span><i class="fas fa-lock bp-lock" style="display:none"></i>';
    var pressTimer=null;
    cell.addEventListener('mousedown',function(){pressTimer=setTimeout(function(){if(typeof toggleLock==='function')toggleLock(c.id);},500);});
    cell.addEventListener('mouseup',  function(){clearTimeout(pressTimer);});
    cell.addEventListener('mouseleave',function(){clearTimeout(pressTimer);});
    cell.addEventListener('dblclick', function(e){e.preventDefault();if(typeof toggleLock==='function')toggleLock(c.id);});
    cell.addEventListener('touchstart',function(){pressTimer=setTimeout(function(){if(typeof toggleLock==='function')toggleLock(c.id);},500);},{passive:true});
    cell.addEventListener('touchend',  function(){clearTimeout(pressTimer);},{passive:true});
    gridWrapper.appendChild(cell);
  });
  g.appendChild(gridWrapper);
}
/* ═══════════════════════════════════
   RENDER HELPERS
═══════════════════════════════════ */
function buildClothingGrid(){
  var grid=document.getElementById('clothingGrid');if(!grid)return;
  grid.innerHTML='';
  var gender=S.characters?(S.characters[typeof activeChar!=='undefined'?activeChar:0]||'fm'):'fm';
  CLOTHING_ITEMS.forEach(function(item){
    // Skip nsfw items — they show in nsfwClothingGrid separately
    if(item.nsfw) return;
    if(gender==='female'&&item.gender==='m') return;
    if(gender==='male'  &&item.gender==='f') return;
    var v=item.label.toLowerCase();
    var b=document.createElement('button');
    b.className='ob'+(S.clothing===v?' on':'');
    b.setAttribute('data-en',item.label);
    b.setAttribute('data-val',v);
    b.setAttribute('data-cat',item.cat);
    b.innerHTML='<span>'+item.label+'</span>';
    b.addEventListener('click',function(){
      if(S.clothing===v){S.clothing=null;b.classList.remove('on');}
      else{
        grid.querySelectorAll('.ob').forEach(function(x){x.classList.remove('on');});
        // Also clear nsfwClothingGrid selection
        var ng=document.getElementById('nsfwClothingGrid');
        if(ng) ng.querySelectorAll('.ob').forEach(function(x){x.classList.remove('on');});
        b.classList.add('on');S.clothing=v;
        if(S.clothingTop||S.clothingBottom){
          S.clothingTop=null;S.clothingBottom=null;
          _syncGrid('clothingTopGrid',function(){return false;});
          _syncGrid('clothingBottomGrid',function(){return false;});
        }
      }
      rebuild();
    });
    grid.appendChild(b);
  });
}
function refreshClothingGrid(){buildClothingGrid();if(window._applyClothingFilter){var a=document.querySelector('.cfc-card.on');window._applyClothingFilter(a?a.dataset.cf:'all');}if(typeof attachAllTriggers==='function')attachAllTriggers();}
function initClothingFilter(){
  var row=document.getElementById('clothingFilterRow'); if(!row)return;
  function applyFilter(cat){
    row.querySelectorAll('.cfc-card').forEach(function(b){b.classList.toggle('on',b.dataset.cf===cat);});
    var grid=document.getElementById('clothingGrid');
    var nsfwGrid=document.getElementById('nsfwClothingGrid');
    var topsBot=document.getElementById('secTopsBottoms');
    var socksSec=document.getElementById('secSocksShoes');
    // Socks & Shoes: show only when socks card active
    if(socksSec) socksSec.style.display=(cat==='socks')?'':'none';
    // Tops & Bottoms: show on all/casual but not socks
    if(topsBot) topsBot.style.display=(cat==='all'||cat==='casual')?'':'none';
    if(!grid)return;
    if(cat==='socks'){
      grid.querySelectorAll('.ob,.og-sep').forEach(function(el){el.style.display='none';});
      if(nsfwGrid)nsfwGrid.style.display='none';
      return;
    }
    if(cat==='all'){
      grid.querySelectorAll('.ob,.og-sep').forEach(function(el){el.style.display='';});
      if(nsfwGrid&&S.nsfw)nsfwGrid.style.display='';
      return;
    }
    if(cat==='nsfw'){
      grid.querySelectorAll('.ob,.og-sep').forEach(function(el){el.style.display='none';});
      if(nsfwGrid&&S.nsfw)nsfwGrid.style.display='';
      return;
    }
    if(nsfwGrid)nsfwGrid.style.display='none';
    grid.querySelectorAll('.og-sep').forEach(function(el){el.style.display='none';});
    grid.querySelectorAll('.ob').forEach(function(b){
      b.style.display=(b.getAttribute('data-cat')===cat)?'':'none';
    });
  }
  row.querySelectorAll('.cfc-card').forEach(function(btn){
    btn.addEventListener('click',function(){applyFilter(btn.dataset.cf);});
  });
  window._applyClothingFilter=applyFilter;
}
function initNsfwStainsVisibility(){var stains=['semen-stained','cum-covered','urine-stained','fecal-stained'];var g=document.getElementById('clothingConditionGrid');if(!g)return;g.querySelectorAll('.ob').forEach(function(b){var v=(b.getAttribute('data-val')||'').toLowerCase();if(stains.some(function(s){return v===s||v.includes(s);})){b.classList.add('nsfw-stain');b.style.display='none';}});g.querySelectorAll('.og-sep').forEach(function(sep){if(sep.textContent.toUpperCase().includes('NSFW')){sep.classList.add('nsfw-stain');sep.style.display='none';}});}
function initHairGenderFilter(){var row=document.getElementById('hairGenderRow');if(!row)return;row.querySelectorAll('.hgf-btn').forEach(function(btn){btn.addEventListener('click',function(){row.querySelectorAll('.hgf-btn').forEach(function(b){b.classList.remove('on');});btn.classList.add('on');var hg=btn.getAttribute('data-hg');var grid=document.getElementById('hairstyleGrid');if(!grid||!grid._dataObj)return;var female=grid._dataObj.female||[],male=grid._dataObj.male||[],shared=grid._dataObj.shared||[];grid.querySelectorAll('.ob').forEach(function(b){var lbl=b.getAttribute('data-en')||'';var inF=female.includes(lbl),inM=male.includes(lbl),inS=shared.includes(lbl);var show=false;if(hg==='all')show=true;else if(hg==='female')show=inF&&!inS;else if(hg==='male')show=inM&&!inS;else if(hg==='shared')show=inS;b.style.display=show?'':'none';});});});}


/* ═══════════════════════════════════════════════════════════════
   SECTION FILTER SYSTEM (sfc-wrap / sfc-card)
   Generic per-section filter bars for all tabs.
═══════════════════════════════════════════════════════════════ */
const SFC_CONFIG = {
  charFilterRow: {
    all:  ['ageGrid','skinGrid','bodyGrid','nsfwBodyGrid','hairstyleGrid'],
    body: ['ageGrid','skinGrid','bodyGrid','nsfwBodyGrid'],
    hair: ['hairstyleGrid'],
  },
  layersFilterRow: {
    all:         ['clothingConditionGrid','clothingAccGrid'],
    condition:   ['clothingConditionGrid'],
    accessories: ['clothingAccGrid'],
  },
  lookFilterRow: {
    all:  ['eyeShapeGrid','faceAccGrid','lookGrid'],
    eyes: ['eyeShapeGrid'],
    face: ['faceAccGrid'],
    dir:  ['lookGrid'],
  },
  moodFilterRow: {
    all:        ['expressionGrid','poseGrid','nsfwPoseGrid','effectsGrid','liquidsGrid','nsfwFluidGrid','nsfwIndicatorGrid','nsfwObjectsGrid'],
    expression: ['expressionGrid'],
    pose:       ['poseGrid','nsfwPoseGrid'],
    effects:    ['effectsGrid'],
    liquids:    ['liquidsGrid','nsfwFluidGrid'],
  },
  objectsFilterRow: {
    all:         ['weaponGrid','propsGrid','electronicsGrid','otherItemsGrid'],
    weapons:     ['weaponGrid'],
    props:       ['propsGrid'],
    electronics: ['electronicsGrid'],
    other:       ['otherItemsGrid'],
  },
  styleFilterRow: {
    all:      ['colorGradeGrid','animeStudioGrid','styleGrid','eraGrid','strokeGrid','shadowGrid','glowGrid','smoothGrid'],
    artstyle: ['styleGrid','eraGrid'],
    studio:   ['animeStudioGrid'],
    color:    ['colorGradeGrid'],
    lines:    ['strokeGrid','shadowGrid','glowGrid','smoothGrid'],
  },
  qualityFilterRow: {
    all:     ['qualityGrid','lightGrid'],
    quality: ['qualityGrid'],
    light:   ['lightGrid'],
  },
  sceneFilterRow: {
    all:         ['envGrid','nsfwEnvGrid'],
    environment: ['envGrid','nsfwEnvGrid'],
  },
  cameraFilterRow: {
    all:   ['angleGrid','shotGrid','nsfwShotGrid','lensGrid','lensEffectGrid','bodyPartsGrid'],
    angle: ['angleGrid'],
    shot:  ['shotGrid','nsfwShotGrid'],
    lens:  ['lensGrid','lensEffectGrid'],
  },
  negativeFilterRow: {
    all:     ['negBodyGrid','negQualityGrid'],
    body:    ['negBodyGrid'],
    quality: ['negQualityGrid'],
  },
};

function _secContaining(gridId){
  var el=document.getElementById(gridId); if(!el) return null;
  var p=el.parentElement;
  while(p){ if(p.classList&&p.classList.contains('sec')) return p; p=p.parentElement; }
  return null;
}

function initSectionFilters(){
  Object.keys(SFC_CONFIG).forEach(function(rowId){
    var row=document.getElementById(rowId); if(!row) return;
    var map=SFC_CONFIG[rowId];
    var allGridIds=[];
    Object.keys(map).forEach(function(k){
      if(k!=='all') map[k].forEach(function(g){ if(allGridIds.indexOf(g)===-1) allGridIds.push(g); });
    });

    function applyFilter(key){
      row.querySelectorAll('.sfc-card').forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-sf')===key); });
      if(key==='all'){
        allGridIds.forEach(function(gid){ var s=_secContaining(gid); if(s) s.style.display=''; });
        return;
      }
      var show=map[key]||[];
      allGridIds.forEach(function(gid){
        var sec=_secContaining(gid); if(!sec) return;
        var shouldShow=show.some(function(sg){ return sec.querySelector('#'+sg)!==null; });
        sec.style.display=shouldShow?'':'none';
      });
    }

    row.querySelectorAll('.sfc-card').forEach(function(btn){
      btn.addEventListener('click',function(){ applyFilter(btn.getAttribute('data-sf')); });
    });
  });
}



/* ── Pose & Action combined filter ── */
function initPoseActionFilter(){
  var row = document.getElementById('poseActionFilterRow');
  if(!row) return;

  var ACTION_CATS = {
    'daily':  ['Eating food','Drinking coffee','Reading a book','Typing on laptop','Talking on phone',
               'Listening to music','Cooking','Shopping','Studying','Playing video games','Watching TV'],
    'sports': ['Running','Jumping','Kicking a ball','Riding a bicycle','Skateboarding','Swimming',
               'Stretching','Doing yoga','Training at gym','Playing tennis'],
    'social': ['Walking a dog','Taking a selfie','Dancing','Singing','Playing guitar','Painting',
               'Writing in journal','Hugging','Waving hello','Having a picnic'],
    'combat': ['Drawing a sword','Casting a spell','Aiming a bow','Throwing a shuriken',
               'Blocking an attack','Leaping into battle','Firing a gun','Running from danger'],
    'other':  ['Injecting with syringe','Holding umbrella in rain','Picking flowers',
               'Sitting by window','Looking at the sky','Sleeping','Waking up','Bathing']
  };

  function applyPAF(cat){
    row.querySelectorAll('[data-paf]').forEach(function(b){
      b.classList.toggle('on', b.getAttribute('data-paf')===cat);
    });
    var poseGrid    = document.getElementById('poseGrid');
    var nsfwPoseGrid= document.getElementById('nsfwPoseGrid');
    var actionsGrid = document.getElementById('actionsGrid');
    if(!actionsGrid) return;

    if(cat === 'all'){
      if(poseGrid)     poseGrid.querySelectorAll('.ob,.og-sep').forEach(function(b){b.style.display='';});
      if(nsfwPoseGrid && S.nsfw) nsfwPoseGrid.querySelectorAll('.ob,.og-sep').forEach(function(b){b.style.display='';});
      actionsGrid.querySelectorAll('.ob,.og-sep').forEach(function(el){el.style.display='';});
      return;
    }
    if(cat === 'pose'){
      if(poseGrid)     poseGrid.querySelectorAll('.ob,.og-sep').forEach(function(b){b.style.display='';});
      if(nsfwPoseGrid && S.nsfw) nsfwPoseGrid.querySelectorAll('.ob,.og-sep').forEach(function(b){b.style.display='';});
      actionsGrid.querySelectorAll('.ob,.og-sep').forEach(function(el){el.style.display='none';});
      return;
    }
    // Action category
    if(poseGrid)     poseGrid.querySelectorAll('.ob,.og-sep').forEach(function(b){b.style.display='none';});
    if(nsfwPoseGrid) nsfwPoseGrid.querySelectorAll('.ob,.og-sep').forEach(function(b){b.style.display='none';});
    var allowed = ACTION_CATS[cat] || [];
    actionsGrid.querySelectorAll('.og-sep').forEach(function(el){el.style.display='none';});
    actionsGrid.querySelectorAll('.ob').forEach(function(b){
      var lbl = b.getAttribute('data-en') || b.textContent.trim();
      b.style.display = allowed.indexOf(lbl) > -1 ? '' : 'none';
    });
  }

  row.querySelectorAll('[data-paf]').forEach(function(btn){
    btn.addEventListener('click', function(){ applyPAF(btn.getAttribute('data-paf')); });
  });
  window._applyPAF = applyPAF;
}



function makeSingle(gid,lbl,val,k,nsfw=false){
  const g=document.getElementById(gid);if(!g)return;
  lbl.forEach((l,i)=>{
    // Category header — non-clickable divider
    if(l.startsWith('—')){
      const sep=document.createElement('div');
      sep.className='og-sep';
      const txt=l.replace(/—/g,'').trim();
      sep.textContent=txt;
      sep.setAttribute('data-en', txt);
      g.appendChild(sep);
      return;
    }
    const v=val?val[i]:l.toLowerCase();
    const b=document.createElement('button');
    b.className='ob'+(nsfw?' rb':'')+(S[k]===v?' on':'');
    b.setAttribute('data-en', l);
    b.setAttribute('data-val', v);
    b.innerHTML=`<span>${l}</span>`;
    b.addEventListener('click',()=>{
      if(S[k]===v){S[k]=null;b.classList.remove('on');var bar=b.querySelector('.hcp-bar');if(bar)bar.style.background='transparent';}
      else{g.querySelectorAll('.ob').forEach(function(x){x.classList.remove('on');var xb=x.querySelector('.hcp-bar');if(xb)xb.style.background='transparent';});b.classList.add('on');S[k]=v;}
      // When selecting NSFW: clear SFW counterpart silently
      if(nsfw && S[k]!==null){
        if(k==='nsfwTop' && S.clothingTop){ S.clothingTop=null; _syncGrid('clothingTopGrid',()=>false); }
        if(k==='nsfwBottom' && S.clothingBottom){ S.clothingBottom=null; _syncGrid('clothingBottomGrid',()=>false); }
      }
      // When selecting SFW: clear NSFW counterpart silently
      if(!nsfw && S[k]!==null){
        if(k==='clothingTop' && S.nsfwTop){ S.nsfwTop=null; _syncGrid('nsfwTopGrid',()=>false); }
        if(k==='clothingBottom' && S.nsfwBottom){ S.nsfwBottom=null; _syncGrid('nsfwBottomGrid',()=>false); }
      }
      rebuild();
    });
    g.appendChild(b);
  });
}

/* Gender-aware single-select: shows female/shared/male items based on active char gender */
function makeGenderSingle(gid, dataObj, k){
  var g = document.getElementById(gid); if(!g) return;
  g.innerHTML = ''; /* will be re-rendered on gender change */
  g._dataObj = dataObj; g._k = k;

  var gender = S.characters ? S.characters[typeof activeChar!=='undefined'?activeChar:0] : null;
  var items;
  if(dataObj.shared){
    var set;
    if(gender==='female')      set = dataObj.female.concat(dataObj.shared);
    else if(gender==='male')   set = dataObj.male.concat(dataObj.shared);
    else                       set = dataObj.female.concat(dataObj.shared).concat(dataObj.male);
    // deduplicate preserving order
    var seen = {}; items = [];
    set.forEach(function(x){ if(!seen[x]){seen[x]=1;items.push(x);} });
  } else {
    items = dataObj.lbl || [];
  }

  items.forEach(function(l){
    if(l.startsWith('—')){ var sep=document.createElement('div');sep.className='og-sep';sep.textContent=l.replace(/—/g,'').trim();g.appendChild(sep);return; }
    var v = l.toLowerCase();
    var b = document.createElement('button');
    b.className='ob'+(S[k]===v?' on':'');
    b.setAttribute('data-en', l);
    b.setAttribute('data-val', v);
    b.innerHTML='<span>'+l+'</span>';
    b.addEventListener('click',function(){
      if(S[k]===v){S[k]=null;b.classList.remove('on');var bar=b.querySelector('.hcp-bar');if(bar)bar.style.background='transparent';}
      else{g.querySelectorAll('.ob').forEach(function(x){x.classList.remove('on');var xb=x.querySelector('.hcp-bar');if(xb)xb.style.background='transparent';});b.classList.add('on');S[k]=v;}
      rebuild();
    });
    g.appendChild(b);
  });
}

/* Re-render all gender-aware grids when active char's gender changes */
function refreshGenderGrids(){
  ['hairstyleGrid','clothingTopGrid','clothingBottomGrid'].forEach(function(gid){
    var g = document.getElementById(gid); if(!g||!g._dataObj) return;
    var cur = S[g._k]; // preserve selection
    makeGenderSingle(gid, g._dataObj, g._k);
    // Re-apply saved selection if still valid
    if(cur){ g.querySelectorAll('.ob').forEach(function(b){ if(b.getAttribute('data-val')===cur) b.classList.add('on'); }); }
  });
  // Also re-run color-picker triggers for rebuilt grids
  if(typeof attachAllTriggers==='function') attachAllTriggers();
  if(typeof attachHairEyePopups==='function') attachHairEyePopups();
  if(typeof refreshClothingGrid==='function') refreshClothingGrid();
}

function makeMulti(gid,lbl,arr,nsfw=false,inlineHide=false){
  const g=document.getElementById(gid);if(!g)return;
  lbl.forEach(l=>{
    if(l.startsWith('—')){const sep=document.createElement('div');sep.className='og-sep';sep.textContent=l.replace(/—/g,'').trim();g.appendChild(sep);return;}
    const v=l.toLowerCase();
    const b=document.createElement('button');
    b.className='ob'+(nsfw?' rb':'')+(inlineHide?' nsfw-item':'')+(S[arr].includes(v)?' on':'');
    b.setAttribute('data-en', l);
    b.setAttribute('data-val', v);
    b.innerHTML=`<span>${l}</span>`;
    b.addEventListener('click',()=>{
      b.classList.toggle('on');
      const i=S[arr].indexOf(v);
      if(i>-1)S[arr].splice(i,1); else S[arr].push(v);
      rebuild();
    });
    g.appendChild(b);
  });
}

function renderColors(gid,arr,sk,toggleable=false){
  const g=document.getElementById(gid);if(!g)return;
  arr.forEach((col,i)=>{
    const b=document.createElement('button');
    const isOn=S[sk]===col.id;
    const fg=col.fg||_fgFor(col.m);
    b.className='cb'+(isOn?' on':'');
    const muted=col.m+'cc'; b.style.cssText=`background:${muted};color:${fg};border-color:${isOn?'rgba(255,255,255,.8)':'transparent'};`;
    b.title=col.n;
    b.setAttribute('data-en', col.n);
    b.setAttribute('data-val', col.id);
    b.innerHTML=`<span>${col.n}</span>`;
    b.addEventListener('click',()=>{
      if(toggleable&&S[sk]===col.id){
        S[sk]=null;b.classList.remove('on');b.style.borderColor='transparent';
      } else {
        g.querySelectorAll('.cb').forEach((x,xi)=>{
          x.classList.remove('on');x.style.borderColor='transparent';
          /* clear bar on deselected buttons */
          var xbar=x.querySelector('.hcp-bar'); if(xbar) xbar.style.background='transparent';
        });
        b.classList.add('on');b.style.borderColor='white';S[sk]=col.id;
      }
      /* update colour bar for this button */
      if(typeof _hcpUpdateBar==='function') _hcpUpdateBar(b, sk);
      rebuild();
    });
    g.appendChild(b);
  });
}

// Simple color swatches using CSS color names — for socks & shoes
// ── Flat lookup: name → {bg, fg}
const SIMPLE_COLOR_MAP = {
  // Neutrals
  'White':       {bg:'#f8f8f8', fg:'#1a1a2e'},
  'Light Gray':  {bg:'#d1d5db', fg:'#1a1a2e'},
  'Gray':        {bg:'#6b7280', fg:'#f0f4ff'},
  'Dark Gray':   {bg:'#374151', fg:'#f0f4ff'},
  'Black':       {bg:'#0f0f0f', fg:'#f0f4ff'},
  // Reds & Pinks
  'Pink':        {bg:'#f472b6', fg:'#1a1a2e'},
  'Hot Pink':    {bg:'#ec4899', fg:'#f0f4ff'},
  'Red':         {bg:'#ef4444', fg:'#f0f4ff'},
  'Crimson':     {bg:'#b91c1c', fg:'#f0f4ff'},
  'Maroon':      {bg:'#7f1d1d', fg:'#f0f4ff'},
  // Warm
  'Peach':       {bg:'#fcd5b0', fg:'#1a1a2e'},
  'Orange':      {bg:'#f97316', fg:'#f0f4ff'},
  'Yellow':      {bg:'#fbbf24', fg:'#1a1a2e'},
  'Gold':        {bg:'#ca8a04', fg:'#f0f4ff'},
  // Greens
  'Mint':        {bg:'#6ee7b7', fg:'#1a1a2e'},
  'Green':       {bg:'#16a34a', fg:'#f0f4ff'},
  'Dark Green':  {bg:'#14532d', fg:'#f0f4ff'},
  'Olive':       {bg:'#4d7c0f', fg:'#f0f4ff'},
  'Teal':        {bg:'#0d9488', fg:'#f0f4ff'},
  // Blues
  'Cyan':        {bg:'#22d3ee', fg:'#1a1a2e'},
  'Sky Blue':    {bg:'#7dd3fc', fg:'#1a1a2e'},
  'Light Blue':  {bg:'#93c5fd', fg:'#1a1a2e'},
  'Blue':        {bg:'#3b82f6', fg:'#f0f4ff'},
  'Navy':        {bg:'#1e3a5f', fg:'#f0f4ff'},
  'Indigo':      {bg:'#4338ca', fg:'#f0f4ff'},
  // Purples
  'Lavender':    {bg:'#c4b5fd', fg:'#1a1a2e'},
  'Purple':      {bg:'#7c3aed', fg:'#f0f4ff'},
  'Violet':      {bg:'#8b5cf6', fg:'#f0f4ff'},
  'Magenta':     {bg:'#d946ef', fg:'#f0f4ff'},
  // Earth
  'Beige':       {bg:'#d4b896', fg:'#1a1a2e'},
  'Brown':       {bg:'#92400e', fg:'#f0f4ff'},
  'Dark Brown':  {bg:'#451a03', fg:'#f0f4ff'},
  // Metallics
  'Silver':      {bg:'#94a3b8', fg:'#1a1a2e'},
  // Patterns
  'Striped':     {bg:'repeating-linear-gradient(45deg,#e5e7eb 0,#e5e7eb 4px,#374151 4px,#374151 8px)', fg:'#1a1a2e'},
  'Plaid':       {bg:'repeating-linear-gradient(0deg,rgba(220,38,38,.4) 0,rgba(220,38,38,.4) 3px,transparent 3px,transparent 12px),repeating-linear-gradient(90deg,rgba(220,38,38,.4) 0,rgba(220,38,38,.4) 3px,transparent 3px,transparent 12px),#1e3a5f', fg:'#f0f4ff'},
  'Sheer':       {bg:'rgba(200,200,200,.18)', fg:'#e8eaf0'},
};

// ── Grouped palette for the modal
const COLOR_GROUPS = [
  { label:'Neutrals',      colors:['White','Light Gray','Gray','Dark Gray','Black'] },
  { label:'Reds & Pinks',  colors:['Pink','Hot Pink','Red','Crimson','Maroon'] },
  { label:'Warm',          colors:['Peach','Orange','Yellow','Gold'] },
  { label:'Greens',        colors:['Mint','Green','Dark Green','Olive','Teal'] },
  { label:'Blues',         colors:['Cyan','Sky Blue','Light Blue','Blue','Navy','Indigo'] },
  { label:'Purples',       colors:['Lavender','Purple','Violet','Magenta'] },
  { label:'Earth Tones',   colors:['Beige','Brown','Dark Brown'] },
  { label:'Metallics',     colors:['Gold','Silver'] },
  { label:'Patterns',      colors:['Striped','Plaid','Sheer'] },
];
function renderSimpleColors(gid, labels, sk){
  const g = document.getElementById(gid); if(!g) return;
  labels.forEach(name => {
    const col = SIMPLE_COLOR_MAP[name] || {bg:'#444', fg:'#fff'};
    const b = document.createElement('button');
    const isOn = S[sk] === name.toLowerCase();
    b.className = 'cb' + (isOn ? ' on' : '');
    b.style.cssText = `background:${col.bg};color:${col.fg};border-color:${isOn ? 'rgba(255,255,255,.85)' : 'transparent'};min-height:28px;`;
    b.title = name;
    b.setAttribute('data-en', name);
    b.setAttribute('data-color', 'true'); // protect from applyLang translation
    b.innerHTML = `<span style="font-size:.6rem;font-weight:700;">${name}</span>`;
    b.addEventListener('click', () => {
      const val = name.toLowerCase();
      if(S[sk] === val){ S[sk] = null; b.classList.remove('on'); b.style.borderColor = 'transparent'; }
      else {
        g.querySelectorAll('.cb').forEach(x => { x.classList.remove('on'); x.style.borderColor = 'transparent'; });
        b.classList.add('on'); b.style.borderColor = 'rgba(255,255,255,.85)'; S[sk] = val;
      }
      rebuild();
    });
    g.appendChild(b);
  });
}

// helper: pick readable fg for a bg hex
function _fgFor(hex){
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  return (r*299+g*587+b*114)/1000>140?'#1a1a2e':'#f0f4ff';
}

function _initColorPickerPopup(){
  const overlay  = document.getElementById('cpOverlay');
  const grid     = document.getElementById('cpGrid');
  const title    = document.getElementById('cpTitle');
  const subtitle = document.getElementById('cpSubtitle');
  const icon     = document.getElementById('cpIcon');
  const swatch   = document.getElementById('cpSwatch');
  const selName  = document.getElementById('cpSelectedName');
  const closeBtn = document.getElementById('cpClose');
  const doneBtn  = document.getElementById('cpDone');
  const clearBtn = document.getElementById('cpClearBtn');
  if(!overlay || !grid) return;

  let _sk = null;

  function _refreshPreview(){
    const val = S[_sk];
    if(val){
      const key = val.charAt(0).toUpperCase()+val.slice(1);
      const col = SIMPLE_COLOR_MAP[key]||{bg:'#888'};
      swatch.style.background = col.bg;
      swatch.classList.add('has-color');
      selName.textContent = key;
    } else {
      swatch.style.background = '';
      swatch.classList.remove('has-color');
      selName.textContent = 'No color selected';
    }
  }

  const CP_META = {
    sockColor:          {icon:'🧦', title:'Sock Color',       sub:'Choose a color for your socks'},
    shoeColor:          {icon:'👟', title:'Footwear Color',   sub:'Choose a color for your shoes'},
    clothingColor:      {icon:'👗', title:'Outfit Color',     sub:'Choose a color for the full outfit'},
    clothingTopColor:   {icon:'👕', title:'Top Color',        sub:'Choose a color for the top'},
    clothingBottomColor:{icon:'👖', title:'Bottom Color',     sub:'Choose a color for the bottom'},
    nsfwTopColor:       {icon:'👙', title:'Top Color',        sub:'Choose a color for the top'},
    nsfwBottomColor:    {icon:'🩲', title:'Bottom Color',     sub:'Choose a color for the bottom'},
    nsfwClothingColor:  {icon:'👗', title:'Outfit Color',     sub:'Choose a color for the outfit'},
  };

  function openPicker(sk){
    _sk = sk;
    const m = CP_META[sk] || {icon:'🎨', title:'Color', sub:'Choose a color'};
    icon.textContent     = m.icon;
    title.textContent    = m.title;
    subtitle.textContent = m.sub;

    grid.innerHTML = '';
    COLOR_GROUPS.forEach(group => {
      // Filter to colors available for this sk
      const available = group.colors.filter(name => D[sk].lbl.includes(name));
      if(!available.length) return;

      // Section label
      const sep = document.createElement('div');
      sep.className = 'cp-group-label';
      sep.textContent = group.label;
      grid.appendChild(sep);

      // Color row
      const row = document.createElement('div');
      row.className = 'cp-color-row';
      available.forEach((name, idx) => {
        const col = SIMPLE_COLOR_MAP[name] || {bg:'#444', fg:'#fff'};
        const b = document.createElement('button');
        const isOn = S[sk] === name.toLowerCase();
        b.className = 'cp-swatch-btn' + (isOn ? ' on' : '');
        b.style.animationDelay = (idx * 0.025) + 's';
        b.title = name;
        b.setAttribute('data-color','true');
        b.innerHTML = `<span class="cp-dot" style="background:${col.bg};"></span><span class="cp-swatch-lbl">${name}</span>`;
        b.addEventListener('click', () => {
          const val = name.toLowerCase();
          grid.querySelectorAll('.cp-swatch-btn').forEach(x => x.classList.remove('on'));
          if(S[_sk] === val){ S[_sk] = null; }
          else { b.classList.add('on'); S[_sk] = val; }
          _refreshPreview();
          _updateColorDot(_sk);
          rebuild();
        });
        row.appendChild(b);
      });
      grid.appendChild(row);
    });

    _refreshPreview();
    overlay.classList.add('open');
  }

  function closePicker(){
    overlay.classList.remove('open');
    setTimeout(() => { _sk = null; }, 300);
  }

  closeBtn.addEventListener('click', closePicker);
  doneBtn.addEventListener('click', closePicker);
  clearBtn.addEventListener('click', () => {
    if(!_sk) return;
    S[_sk] = null;
    grid.querySelectorAll('.cp-swatch-btn').forEach(x => x.classList.remove('on'));
    _refreshPreview();
    _updateColorDot(_sk);
    rebuild();
  });
  overlay.addEventListener('click', e => { if(e.target===overlay) closePicker(); });

  window._openColorPicker  = openPicker;
  window._closeColorPicker = closePicker;
}

function _updateColorDot(colorKey){
  /* Uses hcp-bar system — updates bar ONLY on the active (selected) button */
  var DOT_MAP = {
    sockColor:          {gid:'sockLengthGrid',    isCb:false},
    shoeColor:          {gid:'shoesGrid',          isCb:false},
    clothingColor:      {gid:'clothingGrid',       isCb:false},
    clothingTopColor:   {gid:'clothingTopGrid',    isCb:false},
    clothingBottomColor:{gid:'clothingBottomGrid', isCb:false},
    nsfwTopColor:       {gid:'nsfwTopGrid',        isCb:false},
    nsfwBottomColor:    {gid:'nsfwBottomGrid',     isCb:false},
    nsfwClothingColor:  {gid:'nsfwClothingGrid',   isCb:false},
    clothingAccColor:   {gid:'clothingAccGrid',    isCb:false},
    faceAccColor:       {gid:'faceAccGrid',        isCb:false},
    hairColor1:         {gid:'hairstyleGrid',      isCb:false},
    eyeColor:           {gid:'eyeShapeGrid',       isCb:false},
  };
  var entry = DOT_MAP[colorKey]; if(!entry) return;
  var g = document.getElementById(entry.gid); if(!g) return;
  g.querySelectorAll('.ob').forEach(function(btn){
    var old=btn.querySelector('.color-dot'); if(old) old.remove();
    var bar=btn.querySelector('.hcp-bar');
    if(btn.classList.contains('on')){
      /* Only show color bar on the selected button */
      if(typeof _hcpUpdateBar==='function') _hcpUpdateBar(btn, colorKey);
    } else {
      /* Clear bar on all non-selected buttons */
      if(bar) bar.style.background='transparent';
    }
  });
}

/* ══════════════════════════════════════════════════════
   SHARED HOVER COLOUR POPUP
   Single popup on body, positioned via getBoundingClientRect
   Avoids overflow:hidden clipping on .ob buttons
══════════════════════════════════════════════════════ */
var _HCP_ROWS = [
  [{n:'Red',bg:'#ef4444'},{n:'Crimson',bg:'#b91c1c'},{n:'Orange',bg:'#f97316'},{n:'Amber',bg:'#f59e0b'},{n:'Gold',bg:'#eab308'},{n:'Yellow',bg:'#fde047'},{n:'Lime',bg:'#84cc16'},{n:'Green',bg:'#22c55e'},{n:'Teal',bg:'#14b8a6'}],
  [{n:'Sky Blue',bg:'#38bdf8'},{n:'Blue',bg:'#3b82f6'},{n:'Navy',bg:'#1e3a8a'},{n:'Indigo',bg:'#6366f1'},{n:'Purple',bg:'#7c3aed'},{n:'Violet',bg:'#8b5cf6'},{n:'Pink',bg:'#f472b6'},{n:'Magenta',bg:'#e879f9'},{n:'Lavender',bg:'#c4b5fd'}],
  [{n:'White',bg:'#f1f5f9'},{n:'Light Gray',bg:'#cbd5e1'},{n:'Gray',bg:'#6b7280'},{n:'Dark Gray',bg:'#374151'},{n:'Black',bg:'#111827'},{n:'Beige',bg:'#d4b896'},{n:'Brown',bg:'#92400e'},{n:'Dark Brown',bg:'#451a03'},{n:'Silver',bg:'#94a3b8'}]
];
var _HCP_PATTERNS = [
  {n:'Striped',bg:'repeating-linear-gradient(45deg,#e5e7eb 0,#e5e7eb 4px,#374151 4px,#374151 8px)'},
  {n:'Plaid',bg:'repeating-linear-gradient(0deg,rgba(220,38,38,.4) 0,rgba(220,38,38,.4) 3px,transparent 3px,transparent 12px),repeating-linear-gradient(90deg,rgba(220,38,38,.4) 0,rgba(220,38,38,.4) 3px,transparent 3px,transparent 12px),#1e3a5f'},
  {n:'Sheer',bg:'rgba(200,200,200,.25)'}
];
var _HAIR_ROWS = [
  [{n:'red',bg:'#ef4444'},{n:'coral',bg:'#ff6347'},{n:'orange',bg:'#f97316'},{n:'peach',bg:'#ffb366'},{n:'gold',bg:'#ffd700'},{n:'blonde',bg:'#fef08a'},{n:'yellow',bg:'#fde047'},{n:'lime',bg:'#84cc16'},{n:'green',bg:'#22c55e'}],
  [{n:'mint',bg:'#6ee7b7'},{n:'teal',bg:'#14b8a6'},{n:'cyan',bg:'#22d3ee'},{n:'blue',bg:'#3b82f6'},{n:'indigo',bg:'#4338ca'},{n:'purple',bg:'#7c3aed'},{n:'lavender',bg:'#c4b5fd'},{n:'pink',bg:'#f472b6'},{n:'magenta',bg:'#e879f9'}],
  [{n:'auburn',bg:'#9a3412'},{n:'brown',bg:'#78350f'},{n:'black',bg:'#111827'},{n:'white',bg:'#f1f5f9'},{n:'silver',bg:'#94a3b8'},{n:'gray',bg:'#6b7280'}]
];
var _NO_HAIR_COLOR = {bald:1,stubble:1};

/* ── Shared popup state ── */
var _hcpEl       = null;   /* the #hcpPopup div */
var _hcpColorKey = null;   /* current colorKey */
var _hcpTrigger  = null;   /* current trigger button */
var _hcpHideT    = null;
var _hcpShowT    = null;

function _hcpInit(){
  if(_hcpEl) return;
  _hcpEl = document.getElementById('hcpPopup');
  if(!_hcpEl) return;
  /* hide when clicking outside */
  document.addEventListener('mousedown', function(e){
    if(_hcpEl && !_hcpEl.contains(e.target) && e.target !== _hcpTrigger && (!_hcpTrigger || !_hcpTrigger.contains(e.target))){
      _hcpHide(true);
    }
  });
}

function _hcpPosition(btn){
  var r = btn.getBoundingClientRect();
  var pw = _hcpEl.offsetWidth || 220;
  var left = r.left + r.width/2 - pw/2;
  var top  = r.top - 10;
  if(left < 4) left = 4;
  if(left + pw > window.innerWidth - 4) left = window.innerWidth - pw - 4;
  /* place above button */
  _hcpEl.style.left = left + 'px';
  _hcpEl.style.top  = '';
  _hcpEl.style.bottom = (window.innerHeight - r.top + 10) + 'px';
}

function _hcpShow(btn, colorKey, rows, hasPatterns){
  _hcpInit(); if(!_hcpEl) return;
  clearTimeout(_hcpHideT); _hcpHideT = null;
  clearTimeout(_hcpShowT); _hcpShowT = null;

  _hcpColorKey = colorKey;
  _hcpTrigger  = btn;

  /* Build content */
  _hcpEl.innerHTML = '';
  _hcpEl.className = 'hcp-popup hcp-show';

  var allRows = hasPatterns ? rows.concat([_HCP_PATTERNS]) : rows;
  allRows.forEach(function(rowData){
    var rowEl = document.createElement('div');
    rowEl.className = 'hcp-row';
    rowData.forEach(function(c){
      var sw = document.createElement('div');
      sw.className = 'hcp-sw' + (S[colorKey]===c.n.toLowerCase() ? ' on' : '');
      sw.style.background = c.bg;
      sw.title = c.n;
      sw.addEventListener('mousedown', function(e){
        e.preventDefault(); e.stopPropagation();
        _hcpEl.querySelectorAll('.hcp-sw').forEach(function(x){x.classList.remove('on');});
        sw.classList.add('on');
        S[colorKey] = c.n.toLowerCase();
        _hcpUpdateBar(btn, colorKey);
        rebuild();
      });
      rowEl.appendChild(sw);
    });
    _hcpEl.appendChild(rowEl);
  });

  /* Clear row */
  var clrRow = document.createElement('div');
  clrRow.className = 'hcp-row hcp-clr-row';
  var clrLbl = document.createElement('span'); clrLbl.className='hcp-clr-lbl'; clrLbl.textContent='Clear color';
  var clrBtn = document.createElement('div');  clrBtn.className='hcp-clr-btn'; clrBtn.textContent='✕';
  clrBtn.addEventListener('mousedown', function(e){
    e.preventDefault(); e.stopPropagation();
    S[colorKey]=null;
    _hcpUpdateBar(btn, colorKey);
    _hcpHide(true);
    rebuild();
  });
  clrRow.appendChild(clrLbl); clrRow.appendChild(clrBtn);
  _hcpEl.appendChild(clrRow);

  _hcpEl.style.display = 'block';
  _hcpPosition(btn);

  /* keep open while hovering popup */
  _hcpEl.onmouseenter = function(){ clearTimeout(_hcpHideT); _hcpHideT=null; };
  _hcpEl.onmouseleave = function(){ _hcpHide(false); };
}

function _hcpHide(immediate){
  clearTimeout(_hcpHideT);
  if(immediate){
    if(_hcpEl){ _hcpEl.style.display='none'; _hcpEl.className='hcp-popup'; }
    _hcpColorKey=null; _hcpTrigger=null;
  } else {
    _hcpHideT = setTimeout(function(){
      if(_hcpEl){ _hcpEl.style.display='none'; _hcpEl.className='hcp-popup'; }
      _hcpColorKey=null; _hcpTrigger=null;
    }, 350);
  }
}

/* colour bar under the button label */
function _hcpUpdateBar(btn, colorKey){
  var bar = btn.querySelector('.hcp-bar');
  if(!bar) return;
  var val = S[colorKey];
  if(!val){ bar.style.background='transparent'; return; }
  var bg = null;

  /* 1. Check HAIR_COLORS (for hairColor1) */
  if(!bg && typeof HAIR_COLORS!=='undefined'){
    var hc=HAIR_COLORS.find(function(c){return c.id===val;});
    if(hc) bg=hc.m;
  }
  /* 2. Check EYE_COLORS (for eyeColor) */
  if(!bg && typeof EYE_COLORS!=='undefined'){
    var ec=EYE_COLORS.find(function(c){return c.id===val;});
    if(ec) bg=ec.m;
  }
  /* 3. Check popup rows (for clothing colours) */
  if(!bg){
    var allRows=_HCP_ROWS.concat([_HCP_PATTERNS]).concat(_HAIR_ROWS);
    for(var i=0;i<allRows.length;i++){
      for(var j=0;j<allRows[i].length;j++){
        if(allRows[i][j].n.toLowerCase()===val){ bg=allRows[i][j].bg; break; }
      }
      if(bg) break;
    }
  }
  /* 4. Fallback: SIMPLE_COLOR_MAP */
  if(!bg && typeof SIMPLE_COLOR_MAP!=='undefined'){
    var k=val.charAt(0).toUpperCase()+val.slice(1);
    if(SIMPLE_COLOR_MAP[k]) bg=SIMPLE_COLOR_MAP[k].bg;
  }
  bar.style.background = bg || 'transparent';
}

/* inject .hcp-bar span into a button and attach hover events */
function _hcpAttach(btn, colorKey, isOnFn, rows, hasPatterns){
  if(btn.dataset.hcpDone) return;
  btn.dataset.hcpDone = '1';

  /* inject colour bar span (sits below text, inside button) */
  if(!btn.querySelector('.hcp-bar')){
    var bar = document.createElement('span');
    bar.className = 'hcp-bar';
    btn.appendChild(bar);
  }

  /* hover trigger */
  btn.addEventListener('mouseenter', function(){
    if(!isOnFn()) return;
    clearTimeout(_hcpHideT); _hcpHideT=null;
    clearTimeout(_hcpShowT);
    _hcpShowT = setTimeout(function(){ _hcpShow(btn, colorKey, rows, hasPatterns); }, 650);
  });
  btn.addEventListener('mouseleave', function(e){
    clearTimeout(_hcpShowT); _hcpShowT=null;
    if(_hcpEl && _hcpEl.contains(e.relatedTarget)) return;
    _hcpHide(false);
  });

  /* click: if already on and popup closed → open immediately; if on and popup open → close */
  btn.addEventListener('click', function(e){
    if(e.target.closest('#hcpPopup')) return;
    clearTimeout(_hcpShowT); _hcpShowT=null;
    setTimeout(function(){
      if(!isOnFn()){
        /* deselected → clear colour + close + clear all bars in grid */
        if(S[colorKey]){
          S[colorKey]=null;
          /* clear bars on ALL buttons in same grid */
          var parentGrid = btn.closest('[id]');
          if(parentGrid) parentGrid.querySelectorAll('.hcp-bar').forEach(function(b){ b.style.background='transparent'; });
          rebuild();
        }
        if(_hcpTrigger===btn) _hcpHide(true);
        return;
      }
      if(_hcpTrigger===btn && _hcpEl && _hcpEl.style.display!=='none'){
        _hcpHide(true); /* toggle close */
      } else {
        _hcpShow(btn, colorKey, rows, hasPatterns);
      }
    }, 30);
  });
}

function attachAllTriggers(){
  var TMAP = [
    {gid:'clothingGrid',      ck:'clothingColor',       sk:'clothing',      multi:false, pat:true},
    {gid:'clothingTopGrid',   ck:'clothingTopColor',    sk:'clothingTop',   multi:false, pat:true},
    {gid:'clothingBottomGrid',ck:'clothingBottomColor', sk:'clothingBottom',multi:false, pat:true},
    {gid:'nsfwTopGrid',       ck:'nsfwTopColor',        sk:'nsfwTop',       multi:false, pat:true},
    {gid:'nsfwBottomGrid',    ck:'nsfwBottomColor',     sk:'nsfwBottom',    multi:false, pat:true},
    {gid:'nsfwClothingGrid',  ck:'nsfwClothingColor',   sk:'nsfwClothing',  multi:true,  pat:true},
    {gid:'sockLengthGrid',    ck:'sockColor',           sk:'sockLength',    multi:false, pat:false},
    {gid:'shoesGrid',         ck:'shoeColor',           sk:'shoes',         multi:false, pat:false},
    {gid:'clothingAccGrid',   ck:'clothingAccColor',    sk:'clothingAcc',   multi:true,  pat:false},
    {gid:'faceAccGrid',       ck:'faceAccColor',        sk:'faceAcc',       multi:true,  pat:false}
  ];
  TMAP.forEach(function(entry){
    var gid=entry.gid, ck=entry.ck, sk=entry.sk, multi=entry.multi, pat=entry.pat;
    var g=document.getElementById(gid); if(!g) return;
    g.querySelectorAll('.ob').forEach(function(btn){
      var isOn = function(){ return multi ? (Array.isArray(S[sk])&&S[sk].length>0) : btn.classList.contains('on'); };
      _hcpAttach(btn, ck, isOn, _HCP_ROWS, pat);
    });
  });
}
window.attachAllTriggers = attachAllTriggers;

function attachHairEyePopups(){
  /* Hairstyle buttons → hair colour popup */
  var hg = document.getElementById('hairstyleGrid');
  if(hg) hg.querySelectorAll('.ob').forEach(function(btn){
    if(btn.dataset.hcpDone) return;
    /* inject bar */
    if(!btn.querySelector('.hcp-bar')){ var b=document.createElement('span'); b.className='hcp-bar'; btn.appendChild(b); }
    var isOn = function(){ return btn.classList.contains('on'); };
    _hcpAttach(btn, 'hairColor1', isOn, _HAIR_ROWS, false);
  });

  /* Eye Shape buttons → eye colour popup */
  var eg = document.getElementById('eyeShapeGrid');
  if(eg) eg.querySelectorAll('.ob').forEach(function(btn){
    if(btn.dataset.hcpDone) return;
    if(!btn.querySelector('.hcp-bar')){ var b=document.createElement('span'); b.className='hcp-bar'; btn.appendChild(b); }
    var isOn = function(){ return btn.classList.contains('on'); };
    _hcpAttach(btn, 'eyeColor', isOn, _HCP_ROWS, false);
  });
}
window.attachHairEyePopups = attachHairEyePopups;

/* merged clear buttons */
document.addEventListener('DOMContentLoaded', function(){
  var ch=document.getElementById('clrHair');
  if(ch) ch.addEventListener('click', function(){
    S.hairstyle=null; S.hairColor1=null;
    var g1=document.getElementById('hairstyleGrid');
    if(g1) g1.querySelectorAll('.ob').forEach(function(x){
      x.classList.remove('on');
      var bar=x.querySelector('.hcp-bar'); if(bar) bar.style.background='transparent';
    });
    rebuild();
  });
  var ce=document.getElementById('clrEye');
  if(ce) ce.addEventListener('click', function(){
    S.eyeShape=null; S.eyeColor=null;
    var g1=document.getElementById('eyeShapeGrid');
    if(g1) g1.querySelectorAll('.ob').forEach(function(x){
      x.classList.remove('on');
      var bar=x.querySelector('.hcp-bar'); if(bar) bar.style.background='transparent';
    });
    rebuild();
  });
});

function renderSkins(){
  const g=document.getElementById('skinGrid');if(!g)return;
  SKINS.forEach((s,i)=>{
    const b=document.createElement('button');
    b.className='sb'+(S.skin===s.val?' on':'');
    b.style.cssText=`background:${s.bg};color:${s.fg};border-color:${S.skin===s.val?'white':s.bg}`;
    b.innerHTML=`<span>${s.lbl}</span>`;
    b.setAttribute('data-en', s.lbl);
    b.setAttribute('data-val', s.val);
    b.addEventListener('click',()=>{
      if(S.skin===s.val){S.skin=null;b.classList.remove('on');b.style.borderColor=s.bg;}
      else{
        document.querySelectorAll('.sb').forEach((x,xi)=>{x.classList.remove('on');x.style.borderColor=SKINS[xi].bg;});
        b.classList.add('on');b.style.borderColor='white';S.skin=s.val;
      }
      rebuild();
    });
    g.appendChild(b);
  });
}

/* ═══════════════════════════════════
   NSFW SEPARATORS / INLINE ITEMS
═══════════════════════════════════ */

function toggleNSFW(on){
  // Body parts separator + grid (Camera tab)
  const bpSep=document.getElementById('sep-bodyparts');
  if(bpSep) bpSep.classList.toggle('vis',on);
  const bpGrid=document.getElementById('bodyPartsGrid');
  if(bpGrid) bpGrid.style.display=on?'grid':'none';
  document.querySelectorAll('.nsfw-item:not(.nsfw-stain)').forEach(b=>b.style.display=on?'':'none');
  document.querySelectorAll('.nsfw-stain').forEach(b=>b.style.display=on?'':'none');
  if(!on&&window._applyClothingFilter)window._applyClothingFilter('all');
  // Show/hide NSFW grids
  ['nsfwBodyGrid','nsfwTopGrid','nsfwBottomGrid','nsfwClothingGrid','nsfwConditionGrid','nsfwPoseGrid',
   'nsfwFluidGrid','nsfwIndicatorGrid','nsfwObjectsGrid','nsfwEnvGrid','nsfwShotGrid'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.style.display=on?'grid':'none';
  });
  document.getElementById('leftPanel').classList.toggle('nsfw-active',on);
  if(on) setTimeout(function(){
    if(typeof attachAllTriggers==='function') attachAllTriggers();
    if(typeof window._applyPAF==='function'){
      var activePaf=document.querySelector('#poseActionFilterRow [data-paf].on');
      window._applyPAF(activePaf?activePaf.getAttribute('data-paf'):'all');
    }
  },80);
}

/* ═══════════════════════════════════
   INIT
═══════════════════════════════════ */
/* ═══════════════════════════════════
   CHARACTER CARDS SYSTEM
═══════════════════════════════════ */
// Silhouette SVG strings per gender
const SIL = {
  female: `<i class="fa-solid fa-person-dress"></i>`,
  male:   `<i class="fa-solid fa-person"></i>`,
  unset:  `<i class="fa-solid fa-person-circle-plus"></i>`
};

const GENDER_CFG = {
  female: { cls:'female', label:'Female',   prompt:'1girl'                },
  male:   { cls:'male',   label:'Male',     prompt:'1boy'                 }
};

function buildCharCountText(){
  const active = S.characters.filter(Boolean);
  if(!active.length) return '';
  const c={female:0,male:0};
  active.forEach(g=>c[g]++);
  const parts=[];
  if(c.female===1)parts.push('1girl'); else if(c.female>1)parts.push(c.female+'girls');
  if(c.male===1)  parts.push('1boy');  else if(c.male>1)  parts.push(c.male+'boys');
  if(active.length>=2) parts.push('multiple characters');
  return parts.join(', ');
}

function updateCharWarn(){
  const active = S.characters.filter(Boolean).length;
  const warn = document.getElementById('charWarn');
  if(warn) warn.classList.toggle('vis', active >= 2);
}

/* ─────────────────────────────────────────────────────────────
   ID CARD SYSTEM  — build-once, patch-only architecture
   Cards are created once in initCharCards / gender change.
   renderCharCards() only PATCHES existing DOM — no innerHTML wipe.
   Input values are NEVER overwritten while focused.
───────────────────────────────────────────────────────────── */

/* Age number → label (matches D.age vals) */
function _ageLabel(n){
  var v = parseInt(n);
  if(isNaN(v)||v<1) return '';
  if(v<=3)  return 'toddler';
  if(v<=8)  return 'child';
  if(v<=12) return 'preteen';
  if(v<=17) return 'teen';
  if(v<=25) return 'young adult';
  if(v<=35) return 'adult';
  if(v<=50) return 'middle-aged';
  return 'elderly';
}

/* Build rich tag list from a slot */
function _buildCardTags(slot, gender){
  if(!slot) return [];
  var tags = [];
  /* ── Outfit ── */
  if(slot.clothing)   tags.push({t:(slot.clothingColor?slot.clothingColor+' ':'')+slot.clothing, cat:'outfit', hi:true});
  else {
    if(slot.clothingTop)    tags.push({t:(slot.clothingTopColor?slot.clothingTopColor+' ':'')+slot.clothingTop,    cat:'outfit', hi:true});
    if(slot.clothingBottom) tags.push({t:(slot.clothingBottomColor?slot.clothingBottomColor+' ':'')+slot.clothingBottom, cat:'outfit'});
  }
  if(slot.sockLength) tags.push({t:(slot.sockColor?slot.sockColor+' ':'')+slot.sockLength+' socks', cat:'outfit'});
  if(slot.shoes)      tags.push({t:(slot.shoeColor?slot.shoeColor+' ':'')+slot.shoes, cat:'outfit'});
  (slot.clothingAcc||[]).forEach(function(a){ tags.push({t:a, cat:'acc'}); });
  (slot.faceAcc||[]).forEach(function(a){     tags.push({t:a, cat:'acc'}); });
  (slot.clothingCondition||[]).forEach(function(c){ tags.push({t:c, cat:'acc'}); });
  /* NSFW clothing */
  (slot.nsfwClothing||[]).forEach(function(c){ tags.push({t:c, cat:'outfit'}); });
  if(slot.nsfwTop)    tags.push({t:(slot.nsfwTopColor?slot.nsfwTopColor+' ':'')+slot.nsfwTop, cat:'outfit'});
  if(slot.nsfwBottom) tags.push({t:(slot.nsfwBottomColor?slot.nsfwBottomColor+' ':'')+slot.nsfwBottom, cat:'outfit'});
  /* ── Mood / Pose / FX ── */
  if(slot.expression) tags.push({t:slot.expression, cat:'mood', hi:true});
  (slot.poses||[]).forEach(function(p){    tags.push({t:p, cat:'pose'}); });
  (slot.nsfwPose||[]).forEach(function(p){ tags.push({t:p, cat:'pose'}); });
  (slot.effects||[]).forEach(function(e){  tags.push({t:e, cat:'fx'}); });
  (slot.liquids||[]).forEach(function(l){  tags.push({t:l, cat:'fx'}); });
  (slot.nsfwFluid||[]).forEach(function(f){ tags.push({t:f, cat:'fx'}); });
  /* ── Tools ── */
  (slot.weapons||[]).forEach(function(w){     tags.push({t:w, cat:'tool', hi:true}); });
  (slot.props||[]).forEach(function(p){        tags.push({t:p, cat:'tool'}); });
  (slot.electronics||[]).forEach(function(e){  tags.push({t:e, cat:'tool'}); });
  (slot.otherItems||[]).forEach(function(o){   tags.push({t:o, cat:'tool'}); });
  return tags;
}

/* Render tag HTML */
function _tagsHtml(tags){
  if(!tags.length) return '<span class="idc-no-data">// no data loaded</span>';
  return tags.map(function(tag){
    return '<span class="idc-tag'+(tag.hi?' hi':'')+' cat-'+tag.cat+'">'+tag.t+'</span>';
  }).join('');
}

/* Build the full card HTML — Option 2: Header Band */
function _buildCardHtml(i, gender, slot){
  var cfg   = GENDER_CFG[gender];
  var name  = slot && slot._name ? slot._name : '';
  var age   = slot && slot._age  ? slot._age  : '';
  var isEd  = (typeof activeChar !== 'undefined') && activeChar === i;
  var isFem = gender === 'female';
  var isSaved = !!(slot && slot._saved);

  /* ── Appearance chips ── */
  var chips = [];
  if(slot){
    if(slot.hairColor1 && slot.hairstyle) chips.push({t:slot.hairColor1+' '+slot.hairstyle, cat:'hair'});
    else if(slot.hairColor1) chips.push({t:slot.hairColor1+' hair', cat:'hair'});
    else if(slot.hairstyle)  chips.push({t:slot.hairstyle, cat:'hair'});
    if(slot.eyeColor) chips.push({t:slot.eyeColor+(slot.eyeShape?' · '+slot.eyeShape:''), cat:'eye'});
    if(slot.skin)     chips.push({t:slot.skin, cat:'skin'});
    if(slot.body)     chips.push({t:slot.body, cat:'body'});
  }
  var chipHtml = chips.map(function(c){
    return '<span class="cb-chip cb-chip-'+c.cat+'">'+c.t+'</span>';
  }).join('') || '<span class="cb-no-data">no appearance set</span>';

  /* ── Detail tags (outfit/mood/tools) ── */
  var tags     = _buildCardTags(slot, gender);
  var tagsHtml = _tagsHtml(tags) || '<span class="cb-no-data">no details yet</span>';

  /* ── Meta string for header ── */
  var ageDisplay = '';
  if(age && typeof _ageLabel === 'function') ageDisplay = age + ' · ' + _ageLabel(age);
  else if(age) ageDisplay = age;

  /* ── Status ── */
  var statusHtml = isEd
    ? '<span class="cb-dot cb-dot-on"></span><span class="cb-status-lbl cb-editing">EDITING</span>'
    : '<span class="cb-dot cb-dot-off"></span><span class="cb-status-lbl">STANDBY</span>';

  return ''
  /* ══ HEADER BAND ══ */
  +'<div class="cb-head cb-head-'+gender+'">'
  +  '<div class="cb-head-left">'
  +    '<div class="cb-head-icon cb-icon-'+gender+'">'
  +      '<i class="fa-solid '+(isFem?'fa-person-dress':'fa-person')+'"></i>'
  +    '</div>'
  +    '<div class="cb-head-info">'
  +      '<input class="cb-name-input cb-name-'+gender+'" placeholder="Character name…" maxlength="28" value="'+name.replace(/"/g,'&quot;')+'" autocomplete="off" spellcheck="false">'
  +      '<div class="cb-meta">'
  +        '<span class="cb-badge cb-badge-'+gender+'">'+cfg.label.toUpperCase()+'</span>'
  +        '<input class="cb-age-input" placeholder="age" maxlength="3" value="'+age+'" autocomplete="off">'
  +        '<span class="cb-age-lbl" id="idcAgeLbl'+i+'">'+(age && typeof _ageLabel==='function' ? _ageLabel(age) : '')+'</span>'
  +      '</div>'
  +    '</div>'
  +  '</div>'
  +  '<div class="cb-head-btns">'
  +    '<button class="cb-btn idc-save-btn'+(isSaved?' cb-saved':'')+'" data-idx="'+i+'" title="Save"><i class="fas fa-star"></i></button>'
  +    '<button class="cb-btn idc-lib-btn" data-idx="'+i+'" title="Library"><i class="fas fa-address-book"></i></button>'
  +    '<button class="cb-btn cb-del idc-del-btn" data-idx="'+i+'" title="Remove"><i class="fas fa-xmark"></i></button>'
  +  '</div>'
  +'</div>'

  /* ══ BODY ══ */
  +'<div class="cb-body">'

  /* Appearance section */
  +  '<div class="cb-section-lbl">Appearance</div>'
  +  '<div class="cb-chips" id="cbChips'+i+'">'+chipHtml+'</div>'

  /* Details section */
  +  '<div class="cb-section-lbl" style="margin-top:8px">Details</div>'
  +  '<div class="idc-tags cb-tags" id="idcTags'+i+'">'+tagsHtml+'</div>'

  +'</div>'

  /* ══ FOOTER ══ */
  +'<div class="cb-foot">'
  +  '<div class="cb-status">'+statusHtml+'</div>'
  +  '<span class="cb-unit">UNIT · 0'+(i+1)+'</span>'
  +'</div>';
}

/* Attach events to a card — called once after building */
function _attachCardEvents(card, i){
  // Name input — supports cb-name-input, c2-name-input, c-name-input
  var nameIn = card.querySelector('.cb-name-input, .c2-name-input, .c-name-input');
  if(nameIn){
    nameIn.addEventListener('input', function(e){
      e.stopPropagation();
      if(!charSlots[i]) charSlots[i] = typeof csEmptySlot==='function' ? csEmptySlot() : {};
      charSlots[i]._name = e.target.value;
      if(i === (typeof activeChar!=='undefined' ? activeChar : 0)) S._name = e.target.value;
    });
    nameIn.addEventListener('blur', function(e){
      if(!charSlots[i]) charSlots[i] = typeof csEmptySlot==='function' ? csEmptySlot() : {};
      charSlots[i]._name = e.target.value;
    });
    nameIn.addEventListener('click',   function(e){ e.stopPropagation(); });
    nameIn.addEventListener('keydown', function(e){ e.stopPropagation(); });
    nameIn.addEventListener('mousedown',function(e){ e.stopPropagation(); });
  }

  // Age input — supports cb-age-input, c2-age-input, c-age-input
  var ageIn = card.querySelector('.cb-age-input, .c2-age-input, .c-age-input');
  if(ageIn){
    ageIn.addEventListener('input', function(e){
      e.stopPropagation();
      if(!charSlots[i]) charSlots[i] = typeof csEmptySlot==='function' ? csEmptySlot() : {};
      charSlots[i]._age = e.target.value;
      if(i === (typeof activeChar!=='undefined' ? activeChar : 0)) S._age = e.target.value;
      var lbl = document.getElementById('idcAgeLbl'+i);
      if(lbl) lbl.textContent = e.target.value ? '→ '+_ageLabel(e.target.value) : '';
    });
    ageIn.addEventListener('blur', function(e){
      if(!charSlots[i]) charSlots[i] = typeof csEmptySlot==='function' ? csEmptySlot() : {};
      charSlots[i]._age = e.target.value;
      if(i === (typeof activeChar!=='undefined' ? activeChar : 0)){
        var al = _ageLabel(e.target.value);
        S.age = al || null;
        if(al){
          var ageG = document.getElementById('ageGrid');
          if(ageG){
            ageG.querySelectorAll('.ob').forEach(function(btn){
              var bv = btn.getAttribute('data-val');
              if(bv === al){
                ageG.querySelectorAll('.ob').forEach(function(x){ x.classList.remove('on'); });
                btn.classList.add('on');
                S.age = bv;
              }
            });
          }
        }
      }
      rebuild();
    });
    ageIn.addEventListener('click',    function(e){ e.stopPropagation(); });
    ageIn.addEventListener('keydown',  function(e){ e.stopPropagation(); });
    ageIn.addEventListener('mousedown',function(e){ e.stopPropagation(); });
  }

  // Save btn
  var saveBtn = card.querySelector('.idc-save-btn');
  if(saveBtn) saveBtn.addEventListener('click', function(e){
    e.stopPropagation();
    if(typeof isLoggedIn==='function' && !isLoggedIn()){ showLoginPrompt(); return; }
    if(typeof csSavePreset==='function') csSavePreset(i);
  });

  // Library btn
  var libBtn = card.querySelector('.idc-lib-btn');
  if(libBtn) libBtn.addEventListener('click', function(e){
    e.stopPropagation();
    if(typeof csOpenLibraryFor==='function') csOpenLibraryFor(i);
  });

  // Delete btn
  var delBtn = card.querySelector('.idc-del-btn');
  if(delBtn) delBtn.addEventListener('click', function(e){
    e.stopPropagation();
    S.characters[i] = null;
    if(typeof charSlots!=='undefined') charSlots[i] = null;
    _rebuildSlot(i);
    updateCharWarn(); rebuild();
  });

  // Card click → switch editing
  card.addEventListener('click', function(e){
    if(e.target.closest('.idc-actions')) return;
    var f = document.activeElement;
    if(f && (f.classList.contains('cb-name-input')||f.classList.contains('cb-age-input')||f.classList.contains('c2-name-input')||f.classList.contains('c2-age-input')||f.classList.contains('c-name-input')||f.classList.contains('c-age-input'))) return;
    if(typeof csSwitchTo==='function' && i !== activeChar) csSwitchTo(i);
    else renderCharCards();
  });
}

/* Rebuild a single slot (gender changed / deleted) */
function _rebuildSlot(i){
  var row = document.getElementById('charCardsRow');
  if(!row) return;
  var existing = row.querySelector('[data-card-idx="'+i+'"]');
  var gender   = S.characters[i];
  var slot     = (typeof charSlots!=='undefined') ? charSlots[i] : null;

  if(!gender){
    // Empty placeholder
    var ph = existing || document.createElement('div');
    ph.setAttribute('data-card-idx', i);
    ph.className = 'idc-card idc-empty';
    ph.innerHTML = `<div class="idc-add-icon"><i class="fas fa-person-circle-plus"></i></div>
      <div class="idc-add-lbl">Add Character ${i+1}</div>`;
    if(!ph._hasClick){
      ph._hasClick = true;
      ph.addEventListener('click', function(){ openGenderModal(i); });
    }
    if(!existing) row.appendChild(ph);
    return;
  }

  // Active card — always rebuild DOM for gender/slot changes
  var card = document.createElement('div');
  card.setAttribute('data-card-idx', i);
  card.className = 'idc-card idc-active idc-'+gender;
  card.innerHTML = '<div class="idc-inner">'+_buildCardHtml(i, gender, slot)+'</div>';
  _attachCardEvents(card, i);
  if(existing) row.replaceChild(card, existing);
  else row.appendChild(card);
}

/* ── renderCharCards: patch-only, never destroys inputs ── */
function renderCharCards(){
  var row = document.getElementById('charCardsRow');
  if(!row) return;

  S.characters.forEach(function(gender, i){
    var existing = row.querySelector('[data-card-idx="'+i+'"]');
    var slot = (typeof charSlots!=='undefined') ? charSlots[i] : null;

    /* Case 1: no card yet → build from scratch */
    if(!existing){ _rebuildSlot(i); return; }

    var wasActive = existing.classList.contains('idc-active');
    var wasGender = existing.classList.contains('idc-female') ? 'female'
                  : existing.classList.contains('idc-male')   ? 'male' : null;

    /* Case 2: gender changed or activated/deactivated → full rebuild */
    if(gender !== wasGender){ _rebuildSlot(i); return; }

    /* Case 3: same gender, just update dynamic parts without touching inputs */
    // For active char: read directly from S (always current)
    // For inactive char: flush+read from slot
    var freshSlot;
    if(i === (typeof activeChar!=='undefined' ? activeChar : 0)){
      // Build a synthetic slot from current S values — always accurate
      freshSlot = {
        hairColor1:S.hairColor1, hairstyle:S.hairstyle,
        eyeColor:S.eyeColor, eyeShape:S.eyeShape, skin:S.skin, body:S.body,
        clothing:S.clothing, clothingColor:S.clothingColor,
        clothingTop:S.clothingTop, clothingTopColor:S.clothingTopColor,
        clothingBottom:S.clothingBottom, clothingBottomColor:S.clothingBottomColor,
        clothingAcc:S.clothingAcc||[], clothingCondition:S.clothingCondition||[],
        sockLength:S.sockLength, sockColor:S.sockColor,
        shoes:S.shoes, shoeColor:S.shoeColor,
        faceAcc:S.faceAcc||[],
        expression:S.expression,
        poses:S.poses||[], effects:S.effects||[], liquids:S.liquids||[],
        nsfwTop:S.nsfwTop, nsfwTopColor:S.nsfwTopColor,
        nsfwBottom:S.nsfwBottom, nsfwBottomColor:S.nsfwBottomColor,
        nsfwClothing:S.nsfwClothing||[], nsfwCondition:S.nsfwCondition||[], nsfwPose:S.nsfwPose||[], nsfwFluid:S.nsfwFluid||[],
        weapons:S.weapons||[], props:S.props||[], electronics:S.electronics||[], otherItems:S.otherItems||[],
        _name:S._name, _age:S._age
      };
    } else {
      /* inactive char — read slot directly, NEVER write S into it */
      freshSlot = (typeof charSlots!=='undefined') ? charSlots[i] : null;
    }
    // Update age label if visible
    var ageLblEl = document.getElementById('idcAgeLbl'+i);
    if(ageLblEl && freshSlot && freshSlot._age){
      var al = typeof _ageLabel==='function' ? _ageLabel(freshSlot._age) : '';
      ageLblEl.textContent = al ? al : '';
    }
    // Tags
    var tagsEl = document.getElementById('idcTags'+i);
    if(tagsEl){
      var tags = _buildCardTags(freshSlot, gender);
      tagsEl.innerHTML = _tagsHtml(tags)||'<span class="cb-no-data">no details yet</span>';
    }
    // Appearance chips — cb design
    var chipsEl = document.getElementById('cbChips'+i);
    if(chipsEl && freshSlot){
      var chips2 = [];
      if(freshSlot.hairColor1 && freshSlot.hairstyle) chips2.push({t:freshSlot.hairColor1+' '+freshSlot.hairstyle,cat:'hair'});
      else if(freshSlot.hairColor1) chips2.push({t:freshSlot.hairColor1+' hair',cat:'hair'});
      else if(freshSlot.hairstyle)  chips2.push({t:freshSlot.hairstyle,cat:'hair'});
      if(freshSlot.eyeColor) chips2.push({t:freshSlot.eyeColor+(freshSlot.eyeShape?' · '+freshSlot.eyeShape:''),cat:'eye'});
      if(freshSlot.skin) chips2.push({t:freshSlot.skin,cat:'skin'});
      if(freshSlot.body) chips2.push({t:freshSlot.body,cat:'body'});
      chipsEl.innerHTML = chips2.length
        ? chips2.map(function(c){ return '<span class="cb-chip cb-chip-'+c.cat+'">'+c.t+'</span>'; }).join('')
        : '<span class="cb-no-data">no appearance set</span>';
    }
    // Fallback: old .c2-chips-row
    var chipsRow = existing.querySelector('.c2-chips-row');
    if(chipsRow && freshSlot && !chipsEl){
      var chips3 = [];
      if(freshSlot.hairColor1 && freshSlot.hairstyle) chips3.push({t:freshSlot.hairColor1+' '+freshSlot.hairstyle, cat:'hair'});
      else if(freshSlot.hairColor1) chips3.push({t:freshSlot.hairColor1+' hair', cat:'hair'});
      else if(freshSlot.hairstyle)  chips3.push({t:freshSlot.hairstyle, cat:'hair'});
      if(freshSlot.eyeColor) chips3.push({t:freshSlot.eyeColor+(freshSlot.eyeShape?' · '+freshSlot.eyeShape:''), cat:'eye'});
      if(freshSlot.skin) chips3.push({t:freshSlot.skin, cat:'skin'});
      if(freshSlot.body) chips3.push({t:freshSlot.body, cat:'body'});
      chipsRow.innerHTML = chips3.length
        ? chips3.map(function(c){ return '<span class="cb-chip cb-chip-'+c.cat+'">'+c.t+'</span>'; }).join('')
        : '<span class="cb-no-data">no appearance set</span>';
    }
    // Editing indicator — cb-status
    var isEd2 = (typeof activeChar!=='undefined') && activeChar===i && !!gender;
    var statusEl = existing.querySelector('.cb-status');
    if(statusEl){
      statusEl.innerHTML = isEd2
        ? '<span class="cb-dot cb-dot-on"></span><span class="cb-status-lbl cb-editing">EDITING</span>'
        : '<span class="cb-dot cb-dot-off"></span><span class="cb-status-lbl">STANDBY</span>';
    }
    // Fallback old c2-status
    var statusEl2 = existing.querySelector('.c2-status');
    if(statusEl2){
      statusEl2.innerHTML = isEd2
        ? '<span class="c-status-dot c-status-editing"></span><span class="c-status-lbl">EDITING</span>'
        : '<span class="c-status-dot c-status-standby"></span><span class="c-status-lbl">STANDBY</span>';
    }
    existing.classList.toggle('idc-editing', isEd2);
    // Save btn
    var saveB = existing.querySelector('.idc-save-btn');
    if(saveB) saveB.classList.toggle('idc-saved', !!(slot && slot._saved));
  });
}

/* Gender modal */
let _gIdx = null;

function openGenderModal(idx){
  _gIdx = idx;
  window._gIdx = idx; // expose for char-slots
  const cur = S.characters[idx];
  const sub = document.getElementById('genderModalSub');
  if(sub) sub.textContent = 'Character '+(idx+1);
  document.querySelectorAll('.gender-opt-btn').forEach(btn=>{
    const g=btn.dataset.gender;
    btn.className = 'gender-opt-btn opt-'+g + (cur===g?' sel-'+g:'');
  });
  document.getElementById('genderOverlay').classList.add('open');
}

function closeGenderModal(){
  document.getElementById('genderOverlay').classList.remove('open');
  _gIdx=null;
  /* keep window._gIdx for a tick so char-slots.js savedBtn handler can read it */
  setTimeout(function(){ window._gIdx = null; }, 50);
}

function initGenderModal(){
  document.querySelectorAll('.gender-opt-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(_gIdx===null) return;
      if(!btn.dataset.gender) return; // skip non-gender buttons (e.g. saved)
      const setIdx = _gIdx; // capture before closeGenderModal nulls it
      S.characters[setIdx]=btn.dataset.gender;
      closeGenderModal();
      _rebuildSlot(setIdx); updateCharWarn();
      // Notify char-slots: ensure slot exists and switch editing to new char
      if(typeof charSlots !== 'undefined'){
        if(!charSlots[setIdx]) charSlots[setIdx] = (typeof csEmptySlot==='function') ? csEmptySlot() : {};
        if(setIdx !== activeChar && typeof csSwitchTo==='function') csSwitchTo(setIdx);
        else if(typeof csSave==='function') csSave(activeChar);
      }
      if(typeof refreshGenderGrids==='function') refreshGenderGrids();
      rebuild();
    });
  });
  document.getElementById('genderModalClose').addEventListener('click', closeGenderModal);
  document.getElementById('genderModalReset').addEventListener('click',()=>{
    if(_gIdx===null) return;
    const resetIdx = _gIdx;
    S.characters[resetIdx]=null;
    if(typeof charSlots !== 'undefined') charSlots[resetIdx] = null;
    closeGenderModal();
    _rebuildSlot(resetIdx); updateCharWarn();
    rebuild();
  });
  document.getElementById('genderOverlay').addEventListener('click', e=>{
    if(e.target===document.getElementById('genderOverlay')) closeGenderModal();
  });
}

function initCharCards(){
  renderCharCards();
  const clrBtn = document.getElementById('charCardsClrBtn');
  if(clrBtn) clrBtn.addEventListener('click',()=>{
    S.characters=[null,null];
    if(typeof charSlots!=='undefined'){ charSlots[0]=null; charSlots[1]=null; }
    // Force full slot rebuild for both
    _rebuildSlot(0); _rebuildSlot(1);
    updateCharWarn(); rebuild();
  });
}

function _initClothingMutualExclusion(){
  // ── Full Outfit selected → show conflict + clear Top & Bottom ──
  const fullGrid = document.getElementById('clothingGrid');
  if(fullGrid) fullGrid.querySelectorAll('.ob').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      setTimeout(()=>{
        if(S.clothing){
          const hadTop    = S.clothingTop !== null;
          const hadBottom = S.clothingBottom !== null;
          if(hadTop || hadBottom){
            // Show conflict toast
            toastConflict(S.clothing, hadTop ? S.clothingTop : S.clothingBottom);
          }
          S.clothingTop = null;
          S.clothingBottom = null;
          document.getElementById('clothingTopGrid').querySelectorAll('.ob').forEach(b=>b.classList.remove('on'));
          document.getElementById('clothingBottomGrid').querySelectorAll('.ob').forEach(b=>b.classList.remove('on'));
          rebuild();
        }
      }, 0);
    });
  });

  // ── Top or Bottom selected → show conflict + clear Full Outfit ──
  ['clothingTopGrid','clothingBottomGrid'].forEach(gid=>{
    const g = document.getElementById(gid);
    if(!g) return;
    g.querySelectorAll('.ob').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        setTimeout(()=>{
          if(S.clothingTop !== null || S.clothingBottom !== null){
            if(S.clothing){
              toastConflict(S.clothingTop || S.clothingBottom, S.clothing);
              S.clothing = null;
              document.getElementById('clothingGrid').querySelectorAll('.ob').forEach(b=>b.classList.remove('on'));
              rebuild();
            }
          }
        }, 0);
      });
    });
  });
}

function init(){
  buildBlueprint();
  /* Character */
  initCharCards();
  initGenderModal();
  makeSingle('ageGrid',   D.age.lbl,    D.age.val,   'age');
  renderSkins();
  makeSingle('bodyGrid',  D.body.lbl,   D.body.val,  'body');
  makeMulti('nsfwBodyGrid',D.nsfwBody.lbl,'nsfwBody',true,false);
  /* Appearance */
  makeGenderSingle('hairstyleGrid',D.hairstyle,'hairstyle');
  initHairGenderFilter();
  makeSingle('eyeShapeGrid',D.eyeShape.lbl,null,'eyeShape');
  setTimeout(function(){ if(typeof attachHairEyePopups==='function') attachHairEyePopups(); },200);
  /* Outfit */
  makeGenderSingle('clothingTopGrid', D.clothingTop, 'clothingTop');
  makeSingle('nsfwTopGrid',        D.nsfwTop.lbl,        null, 'nsfwTop',    true);
  makeGenderSingle('clothingBottomGrid', D.clothingBottom, 'clothingBottom');
  makeSingle('nsfwBottomGrid',     D.nsfwBottom.lbl,     null, 'nsfwBottom', true);
  buildClothingGrid();
  _initClothingMutualExclusion();
  initClothingFilter();
  makeMulti('clothingConditionGrid',D.clothingCondition.lbl,'clothingCondition');
  makeMulti('nsfwConditionGrid',D.nsfwCondition.lbl,'nsfwCondition',true,false);
  initNsfwStainsVisibility();
  (function(){var f=[],m=[],s=[];CLOTHING_ITEMS.forEach(function(it){if(it.nsfw)return;if(it.gender==='f')f.push(it.label);else if(it.gender==='m')m.push(it.label);else s.push(it.label);});D.clothing.female=f;D.clothing.male=m;D.clothing.shared=s;})();
  makeMulti('nsfwClothingGrid',D.nsfwClothing.lbl,'nsfwClothing',true,false);
  makeMulti('bodyPartsGrid',   D.bodyParts.lbl,   'bodyParts',   true, true);
  makeMulti('clothingAccGrid', D.clothingAcc.lbl, 'clothingAcc');
  makeSingle('sockLengthGrid', D.sockLength.lbl,  null,'sockLength');
  makeSingle('shoesGrid',      D.shoes.lbl,       null,'shoes');
  _initColorPickerPopup();
  makeMulti('faceAccGrid',     D.faceAcc.lbl,     'faceAcc');
  /* Mood */
  makeSingle('expressionGrid', D.expression.lbl,null,'expression');
  makeMulti('poseGrid',   D.pose.lbl,   'poses');
  makeMulti('actionsGrid', D.actions.lbl,'actions');
  initPoseActionFilter();
  makeMulti('nsfwPoseGrid',D.nsfwPose.lbl,'nsfwPose',true,false);
  makeMulti('effectsGrid',D.effects.lbl,'effects');
  makeMulti('liquidsGrid',D.liquids.lbl,'liquids');
  makeMulti('nsfwFluidGrid',D.nsfwFluid.lbl,'nsfwFluid',true,false);
  /* Tools */
  makeMulti('weaponGrid',      D.weapons.lbl,     'weapons');
  makeMulti('propsGrid',       D.props.lbl,       'props');
  makeMulti('electronicsGrid', D.electronics.lbl, 'electronics');
  makeMulti('otherItemsGrid',  D.otherItems.lbl,  'otherItems');
  makeMulti('nsfwIndicatorGrid',D.nsfwIndicator.lbl,'nsfwIndicator',true,false);
  makeMulti('nsfwObjectsGrid',D.nsfwObjects.lbl,'nsfwObjects',true,false);
  /* Scene */
  makeSingle('envGrid',  D.environment.lbl,null,'environment');
  makeMulti('nsfwEnvGrid',D.nsfwEnv.lbl,'nsfwEnv',true,false);
  makeSingle('styleGrid',D.style.lbl,null,'style');
  makeSingle('eraGrid',  D.era.lbl,  null,'era');
  makeSingle('animeStudioGrid', D.animeStudio.lbl, null, 'animeStudio');
  makeSingle('colorGradeGrid', D.colorGrade.lbl, null, 'colorGrade');
  /* Camera */
  makeSingle('angleGrid',     D.angle.lbl,     null,'angle');
  makeSingle('shotGrid',      D.shot.lbl,      null,'shot');
  makeMulti('nsfwShotGrid',D.nsfwShot.lbl,'nsfwShot',true,false);
  makeSingle('lookGrid',      D.look.lbl,      null,'look');
  makeSingle('lensGrid',      D.lens.lbl,      null,'lens');
  makeSingle('lensEffectGrid',D.lensEffect.lbl,null,'lensEffect');
  /* Quality */
  makeSingle('strokeGrid', D.stroke.lbl, null,'stroke');
  makeSingle('shadowGrid', D.shadow.lbl, null,'shadow');
  makeMulti('qualityGrid', D.quality.lbl,'quality');
  makeMulti('lightGrid',   D.light.lbl,  'lights');
  makeSingle('glowGrid',   D.glow.lbl,   null,'glow');
  makeSingle('smoothGrid', D.smooth.lbl, null,'smooth');
  /* Negative */
  makeMulti('negBodyGrid',D.negBody.lbl,'negBody');
  makeMulti('negQualityGrid',D.negQuality.lbl,'negQuality');

  buildCounterDots();
  attachEvents();
  initSectionFilters();
  renderFavList();
  // Hide all NSFW items and grids initially
  document.querySelectorAll('.nsfw-item').forEach(b=>b.style.display='none');
  ['nsfwBodyGrid','nsfwTopGrid','nsfwBottomGrid','nsfwClothingGrid','nsfwConditionGrid','bodyPartsGrid','nsfwPoseGrid',
   'nsfwFluidGrid','nsfwIndicatorGrid','nsfwObjectsGrid','nsfwEnvGrid','nsfwShotGrid'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.style.display='none';
  });
}

/* ═══════════════════════════════════
   EVENTS
═══════════════════════════════════ */
function attachEvents(){

  /* ── Global lock interceptor — blocks clicks on locked grids ── */
  document.addEventListener('click', function(e){
    if(!S.locked || !Object.keys(S.locked).length) return;
    var btn = e.target.closest('.ob,.cb,.sb');
    if(!btn) return;
    /* Find the grid this button belongs to */
    var el = btn.parentElement;
    var gid = null;
    while(el && el !== document.body){
      if(el.id && (el.classList.contains('og') || el.classList.contains('skin-grid') || el.id.endsWith('Grid'))){
        gid = el.id; break;
      }
      el = el.parentElement;
    }
    if(!gid) return;
    if(isGridLocked(gid)){
      e.stopImmediatePropagation();
      e.preventDefault();
      /* Visual pulse on the locked bp-cell */
      BP_CELLS.forEach(function(c){
        if(!isLocked(c.id)) return;
        if(c.keys.some(function(k){ return _keyToGridIds(k).indexOf(gid)>-1; })){
          var cell = document.getElementById(c.id);
          if(cell){ cell.classList.remove('bp-lock-pulse'); void cell.offsetWidth; cell.classList.add('bp-lock-pulse'); }
        }
      });
    }
  }, true); /* capture phase — runs before button's own handler */

  /* ── Main section toggle (Characters / Scene) ── */
  const CHAR_CATS = ['style','character','outfit','layers','look','pose','objects','mood'];
  const SCENE_CATS = ['scene','camera','quality','negative'];

  var _activeSection = 'char';
  function switchMainSection(ms, tabId){
    _activeSection = ms;
    document.querySelectorAll('.ms-btn').forEach(b=>b.classList.toggle('ms-active', b.dataset.ms===ms));
    const isChar = ms==='char';
    document.getElementById('charTabs').style.display  = isChar ? ''      : 'none';
    document.getElementById('sceneTabs').style.display = isChar ? 'none'  : '';
    const cardsEl = document.querySelector('.char-cards-sticky');
    if(cardsEl) cardsEl.style.display = isChar ? '' : 'none';
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
    document.querySelectorAll('.cat').forEach(x=>x.classList.remove('on'));
    // Activate specific tab or first tab of panel
    const panel = document.getElementById(isChar ? 'charTabs' : 'sceneTabs');
    const target = tabId ? panel.querySelector('[data-c="'+tabId+'"]') : panel.querySelector('.tab');
    if(target){
      target.classList.add('on');
      const catEl = document.getElementById('cat-'+target.dataset.c);
      if(catEl) catEl.classList.add('on');
    }
  }

  document.querySelectorAll('.ms-btn').forEach(b=>b.addEventListener('click',()=>{
    switchMainSection(b.dataset.ms);
  }));

  /* tabs — works with grouped tab structure */
  document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
    document.querySelectorAll('.cat').forEach(x=>x.classList.remove('on'));
    t.classList.add('on');
    const catEl=document.getElementById('cat-'+t.dataset.c);
    if(catEl) catEl.classList.add('on');
    // Re-apply NSFW visibility after tab switch
    if(S.nsfw){
      ['nsfwBodyGrid','nsfwTopGrid','nsfwBottomGrid','nsfwClothingGrid','nsfwPoseGrid',
       'nsfwFluidGrid','nsfwIndicatorGrid','nsfwObjectsGrid','nsfwEnvGrid','nsfwShotGrid'].forEach(function(id){
        var el=document.getElementById(id);
        if(el) el.style.display='grid';
      });
      document.querySelectorAll('.nsfw-item:not(.nsfw-stain)').forEach(function(b){b.style.display='';});
      document.querySelectorAll('.nsfw-stain').forEach(function(b){b.style.display='';});
    }
    // Re-apply clothing filter state
    if(window._applyClothingFilter){
      var activeCard=document.querySelector('#clothingFilterRow .cfc-card.on');
      window._applyClothingFilter(activeCard?activeCard.dataset.cf:'all');
    }
    // Restore NSFW grids that clothing filter may have hidden
    if(S.nsfw){
      ['nsfwClothingGrid','nsfwConditionGrid','nsfwTopGrid','nsfwBottomGrid',
       'nsfwBodyGrid','nsfwPoseGrid','nsfwFluidGrid','nsfwIndicatorGrid',
       'nsfwObjectsGrid','nsfwEnvGrid','nsfwShotGrid'].forEach(function(id){
        var el=document.getElementById(id);
        if(el) el.style.display='grid';
      });
    }
  }));

  /* theme */
  document.getElementById('themeBtn').addEventListener('click',e=>{e.stopPropagation();document.getElementById('ttray').classList.toggle('open');});
  document.addEventListener('click',e=>{
    if(!e.target.closest('.tw')) document.getElementById('ttray').classList.remove('open');
    if(!e.target.closest('.fav-wrap')&&!e.target.closest('#favOpenBtn')) document.getElementById('favDropdown').classList.remove('open');
  });
  document.getElementById('ttray').addEventListener('click',e=>e.stopPropagation());
  document.querySelectorAll('.tdot').forEach(d=>d.addEventListener('click',()=>{
    document.querySelectorAll('.tdot').forEach(x=>x.classList.remove('on'));
    d.classList.add('on');
    const t=d.dataset.t,isL=document.body.classList.contains('light');
    document.body.className=(isL?'light ':'')+( t?'t-'+t:'');
  }));

  /* light */
  document.getElementById('lightBtn').addEventListener('click',()=>{
    document.body.classList.toggle('light');
    document.getElementById('lightBtn').classList.toggle('on');
  });

  /* NSFW */
  document.getElementById('nsfwBtn').addEventListener('click',()=>{
    if(S.nsfw){
      S.nsfw = false;
      document.getElementById('nsfwBtn').classList.remove('on');
      toggleNSFW(false);
      rebuild();
    } else {
      if(!window._currentUser){
        toast('🔒 Sign in to unlock NSFW','warn');
        return;
      }
      if(sessionStorage.getItem('aps_age_confirmed') === '1'){
        S.nsfw = true;
        document.getElementById('nsfwBtn').classList.add('on');
        toggleNSFW(true);
        rebuild();
      } else {
        document.getElementById('agOverlay').classList.add('open');
      }
    }
  });

  document.getElementById('agConfirm').addEventListener('click',()=>{
    sessionStorage.setItem('aps_age_confirmed','1');
    document.getElementById('agOverlay').classList.remove('open');
    S.nsfw = true;
    document.getElementById('nsfwBtn').classList.add('on');
    toggleNSFW(true);
    rebuild();
  });

  document.getElementById('agCancel').addEventListener('click',()=>{
    document.getElementById('agOverlay').classList.remove('open');
  });

  // Close on overlay click
  document.getElementById('agOverlay').addEventListener('click', e=>{
    if(e.target === document.getElementById('agOverlay'))
      document.getElementById('agOverlay').classList.remove('open');
  });

  /* Favourites dropdown */
  document.getElementById('favOpenBtn').addEventListener('click',e=>{
    e.stopPropagation();
    document.getElementById('favDropdown').classList.toggle('open');
  });
  document.getElementById('favDropdown').addEventListener('click',e=>e.stopPropagation());

  /* Fav/Preset tabs */


  /* Save favourite */
  document.getElementById('saveFavBtn').addEventListener('click',()=>{
    if(!window._currentUser){
      toast('🔒 Sign in to save favourites','warn');
      return;
    }
    const pos=buildPosText();
    if(!pos||pos==='') return toast('Nothing to save yet!','warn');
    openModal('Save Favourite','Give this prompt a name','', async name=>{
      if(!name.trim()) return;
      const { favourites, ...stateSnap } = S;
      const fav = {id:Date.now(),name:name.trim(),pos,neg:buildNegText(),date:new Date().toLocaleDateString(), state: JSON.parse(JSON.stringify(stateSnap))};
      S.favourites.unshift(fav);
      if(S.favourites.length>50)S.favourites.pop();
      // ── Sync to Firestore FIRST, then update local ──
      try {
        await window._fbFavs.save(window._currentUser.uid, fav);
        localStorage.setItem('aps6Favs',JSON.stringify(S.favourites));
        renderFavList();
        toast('⭐ Saved & synced: '+name.trim());
      } catch(e){
        // Firestore failed — still save locally
        localStorage.setItem('aps6Favs',JSON.stringify(S.favourites));
        renderFavList();
        toast('⭐ Saved locally (sync failed)','warn');
        console.warn('Firestore save error:', e);
      }
    });
  });


  document.getElementById('clearFavsBtn').addEventListener('click',()=>{
    S.favourites=[];localStorage.removeItem('aps6Favs');renderFavList();toast('Favourites cleared');
    const u = window._currentUser;
    if(u && window._fbFavs){
      window._fbFavs.clear(u.uid).catch(console.warn);
    }
  });

  /* Copy */
  document.getElementById('copyBtn').addEventListener('click',()=>{
    const pos=getFinalPos(),neg=getFinalNeg();
    if(!pos) return toast('Nothing to copy yet!','warn');
    navigator.clipboard.writeText(`Positive:\n${pos}\n\nNegative:\n${neg}`).then(()=>{
      const b=document.getElementById('copyBtn');
      b.innerHTML='<i class="fas fa-check"></i> Copied!';b.classList.add('ok');
      setTimeout(()=>{b.innerHTML='<i class="fas fa-copy"></i> <span data-i18n="copy_full">Copy Full Prompt</span>';b.classList.remove('ok');},2000);
      toast('Full prompt copied!');
    });
  });
  document.getElementById('copyPosBtn').addEventListener('click',()=>{const p=getFinalPos();if(p)navigator.clipboard.writeText(p).then(()=>toast('Positive copied!'));});
  document.getElementById('copyNegBtn').addEventListener('click',()=>{const n=getFinalNeg();if(n)navigator.clipboard.writeText(n).then(()=>toast('Negative copied!'));});

  /* Reset */
  document.getElementById('resetBtn').addEventListener('click',()=>resetAll());

  /* Clear section */
  document.querySelectorAll('.sec-clr[data-k]').forEach(b=>b.addEventListener('click',()=>{
    const k=b.dataset.k; S[k]=null;
    (b.closest('.sec')||b.parentElement).querySelectorAll('.ob,.cw').forEach(x=>x.classList.remove('on'));
    // Also clear .cb color swatches (sockColor, shoeColor)
    (b.closest('.sec')||b.parentElement).querySelectorAll('.cb').forEach(x=>{x.classList.remove('on');x.style.borderColor='transparent';});
    if(k==='skin') document.querySelectorAll('.sb').forEach((x,i)=>{x.classList.remove('on');x.style.borderColor=SKINS[i].bg;});
    rebuild();
  }));
  document.querySelectorAll('.sec-clr[data-arr]').forEach(b=>b.addEventListener('click',()=>{
    const k=b.dataset.arr; if(Array.isArray(S[k])) S[k]=[];
    (b.closest('.sec')||b.parentElement).querySelectorAll('.ob').forEach(x=>x.classList.remove('on'));
    rebuild();
  }));
  // Shared clear button for Tops + Bottoms
  const clrTB = document.getElementById('clrTopBottom');
  if(clrTB) clrTB.addEventListener('click',()=>{
    S.clothingTop=null; S.clothingBottom=null; S.nsfwTop=null; S.nsfwBottom=null;
    document.getElementById('clothingTopGrid').querySelectorAll('.ob').forEach(b=>b.classList.remove('on'));
    document.getElementById('clothingBottomGrid').querySelectorAll('.ob').forEach(b=>b.classList.remove('on'));
    document.getElementById('nsfwTopGrid').querySelectorAll('.ob').forEach(b=>b.classList.remove('on'));
    document.getElementById('nsfwBottomGrid').querySelectorAll('.ob').forEach(b=>b.classList.remove('on'));
    rebuild();
  });

  /* Tag inputs */
  setupTagInput('posTagInput','posTagBox','pos');
  setupTagInput('negTagInput','negTagBox','neg');

  /* Random / Built-in Presets */
  document.getElementById('randomBtn').addEventListener('click',randomize);

  /* Default to Characters section on load */
  switchMainSection('char', 'character');
}

function setupTagInput(inputId,boxId,type){
  const inp=document.getElementById(inputId);
  inp.addEventListener('keydown',e=>{
    if((e.key==='Enter'||e.key==='Tab')&&inp.value.trim()){
      e.preventDefault();
      inp.value.split(',').map(t=>t.trim()).filter(Boolean).forEach(t=>{
        const arr=type==='pos'?S.extraPos:S.extraNeg;
        if(!arr.includes(t)) arr.push(t);
      });
      inp.value='';
      renderTagBoxes();rebuild();
    }
    if(e.key==='Backspace'&&inp.value===''){
      const arr=type==='pos'?S.extraPos:S.extraNeg;
      if(arr.length){arr.pop();renderTagBoxes();rebuild();}
    }
  });
  document.getElementById(boxId).addEventListener('click',()=>inp.focus());
}

/* ═══════════════════════════════════
   TAG BOXES
═══════════════════════════════════ */
function renderTagBoxes(){
  _renderTags('posTagBox','posTagInput',S.extraPos,'pos');
  _renderTags('negTagBox','negTagInput',S.extraNeg,'neg');
}
function _renderTags(boxId,inputId,arr,type){
  const box=document.getElementById(boxId);
  const inp=document.getElementById(inputId);
  box.querySelectorAll('.tag-item').forEach(x=>x.remove());
  arr.forEach((t,i)=>{
    const el=document.createElement('div');
    el.className='tag-item'+(type==='neg'?' neg-tag':'');
    el.innerHTML=`${t}<button onclick="removeTag('${type}',${i})">×</button>`;
    box.insertBefore(el,inp);
  });
}
function removeTag(type,i){
  if(type==='pos')S.extraPos.splice(i,1); else S.extraNeg.splice(i,1);
  renderTagBoxes();rebuild();
}

/* ═══════════════════════════════════
   PROMPT BUILD
═══════════════════════════════════ */
function buildPosText(){
  const p=[];
  // FIX 9: Quality ALWAYS first
  if(S.quality.length)p.push(S.quality.join(', '));
  const _ct=buildCharCountText(); if(_ct)p.push(_ct); else if(S.charCount)p.push(S.charCount);
  if(S.age)p.push(S.age);
  if(S.body)p.push(S.body);
  if(S.skin)p.push(S.skin);
  if(S.nsfw&&S.nsfwBody.length)p.push(S.nsfwBody.join(', '));
  if(S.eyeShape&&S.eyeColor)p.push(`${S.eyeShape}, ${S.eyeColor} eyes`);
  else if(S.eyeShape)p.push(`${S.eyeShape} eyes`);
  else if(S.eyeColor)p.push(`${S.eyeColor} eyes`);
  // Fix 3+4: hair color + style combined, no duplication
  if(S.hairColor1&&S.hairstyle)p.push(`${S.hairColor1} ${S.hairstyle} hair`);
  else if(S.hairColor1)p.push(`${S.hairColor1} hair`);
  else if(S.hairstyle)p.push(`${S.hairstyle} hair`);
  // Build outfit: Top+Bottom combo OR Full Outfit — never mix both
  const wearParts=[];
  if(S.clothing) wearParts.push(S.clothingColor ? `${S.clothingColor} ${S.clothing}` : S.clothing);
  else {
    if(S.clothingTop)    wearParts.push(S.clothingTopColor    ? `${S.clothingTopColor} ${S.clothingTop}`       : S.clothingTop);
    if(S.clothingBottom) wearParts.push(S.clothingBottomColor ? `${S.clothingBottomColor} ${S.clothingBottom}` : S.clothingBottom);
  }
  if(S.nsfw){
    if(S.nsfwTop)     wearParts.push(S.nsfwTopColor      ? `${S.nsfwTopColor} ${S.nsfwTop}`           : S.nsfwTop);
    if(S.nsfwBottom)  wearParts.push(S.nsfwBottomColor   ? `${S.nsfwBottomColor} ${S.nsfwBottom}`     : S.nsfwBottom);
    S.nsfwClothing.forEach(c => wearParts.push(S.nsfwClothingColor ? `${S.nsfwClothingColor} ${c}` : c));
  }
  if(wearParts.length)p.push('wearing '+wearParts.join(', '));
  if(S.clothingCondition.length){var _rc=S.clothingCondition.filter(c=>!c.startsWith('—')&&c.trim());if(_rc.length)p.push(_rc.join(', ')+' clothing');}
  if(S.nsfw&&(S.nsfwCondition||[]).length)p.push(S.nsfwCondition.join(', ')+' stained clothing');
  if(S.clothingAcc.length)p.push(S.clothingAcc.join(', '));
  if(S.nsfw&&S.bodyParts.length)p.push(S.bodyParts.join(', '));
  if(S.sockColor&&S.sockLength)p.push(`${S.sockColor} ${S.sockLength} socks`);
  else if(S.sockLength)p.push(`${S.sockLength} socks`);
  if(S.shoes)p.push(S.shoeColor ? `${S.shoeColor} ${S.shoes}` : S.shoes);
  if(S.faceAcc.length)p.push(S.faceAcc.join(', '));
  if(S.expression)p.push(`${S.expression} expression`);
  const poses=[...S.poses,...(S.nsfw?S.nsfwPose:[])];
  if(poses.length)p.push(poses.join(', '));
  if((S.actions||[]).length){
    var _acts=S.actions.filter(function(a){return !a.startsWith('—');});
    if(_acts.length) p.push(_acts.join(', '));
  }
  if(S.effects.length)p.push(S.effects.join(', '));
  const fluids=[...S.liquids,...(S.nsfw?S.nsfwFluid:[])];
  if(fluids.length)p.push(fluids.join(', '));
  const items=[...(S.weapons||[]),...(S.props||[]),...(S.electronics||[]),...(S.otherItems||[])];
  if(items.length)p.push('holding '+items.join(', '));
  if(S.nsfw&&S.nsfwIndicator.length)p.push(S.nsfwIndicator.join(', '));
  if(S.nsfw&&(S.nsfwObjects||[]).length){
    var _nobj=S.nsfwObjects.filter(function(x){return !x.startsWith('—');});
    if(_nobj.length) p.push('with '+_nobj.join(', '));
  }
  const envs=[...(S.environment?[`in ${S.environment}`]:[]),...(S.nsfw?S.nsfwEnv.map(e=>`in ${e}`):[])];
  if(envs.length)p.push(envs.join(', '));
  if(S.era)p.push(`${S.era} style`);
  if(S.style)p.push(S.style);
  if(S.animeStudio)p.push(S.animeStudio);
  if(S.colorGrade)p.push(S.colorGrade);
  if(S.stroke)p.push(S.stroke);
  if(S.shadow)p.push(S.shadow);
  if(S.lights.length)p.push(S.lights.join(', '));
  if(S.glow&&S.glow!=='no glow')p.push(S.glow);
  if(S.smooth)p.push(S.smooth);
  if(S.angle)p.push(S.angle);
  if(S.shot)p.push(S.shot);
  if(S.nsfw&&S.nsfwShot.length)p.push(S.nsfwShot.join(', '));
  if(S.look)p.push(`looking ${S.look}`);
  if(S.lens)p.push(`${S.lens} lens`);
  if(S.lensEffect&&S.lensEffect.toLowerCase()!=='none')p.push(S.lensEffect);
  return p.join(', ').replace(/,\s*$/,'');
}

function buildNegText(){
  const all=[...S.negatives,...S.negBody,...S.negQuality];
  if(!all.length) return '';
  return 'low quality, blurry, bad anatomy, watermark, '+all.join(', ');
}

/* Apply weights to a comma-separated tag string */
function applyWeights(text){
  if(!text||!Object.keys(S.weights).length) return text;
  return text.split(', ').map(tag=>{
    const key = tag.trim().toLowerCase();
    const w = S.weights[key];
    if(!w || w === 1.0) return tag;
    return `(${tag}:${w.toFixed(1)})`;
  }).join(', ');
}

function getFinalPos(){
  const auto = buildPosText();
  if(!auto&&!S.extraPos.length) return '';
  const all = [auto, ...S.extraPos].filter(Boolean).join(', ');
  return applyWeights(all);
}
function getFinalNeg(){
  const auto=buildNegText();
  const base='low quality, blurry, bad anatomy, watermark';
  if(!auto&&!S.extraNeg.length) return base;
  const parts=[];
  if(!auto) parts.push(base); else parts.push(auto);
  if(S.extraNeg.length) parts.push(S.extraNeg.join(', '));
  return applyWeights(parts.join(', '));
}

/* Build colored chip groups for visual display */
function buildPosGroups(){
  const G=[];
  function add(cls,items){const f=items.filter(Boolean);if(f.length)G.push({cls,items:f});}
  // Quality
  if(S.quality.length) add('q',[S.quality.join(', ')]);
  // Character
  const ch=[];
  const _ct2=buildCharCountText();
  if(_ct2) ch.push(_ct2); else if(S.charCount) ch.push(S.charCount);
  if(S.age) ch.push(S.age);
  if(S.body) ch.push(S.body);
  if(S.skin) ch.push(S.skin);
  if(S.nsfw&&S.nsfwBody.length) ch.push(...S.nsfwBody);
  if(ch.length) add('c',ch);
  // Look
  const lk=[];
  if(S.eyeShape&&S.eyeColor) lk.push(S.eyeShape+', '+S.eyeColor+' eyes');
  else if(S.eyeShape) lk.push(S.eyeShape+' eyes');
  else if(S.eyeColor) lk.push(S.eyeColor+' eyes');
  if(S.hairColor1&&S.hairstyle) lk.push(S.hairColor1+' '+S.hairstyle+' hair');
  else if(S.hairColor1) lk.push(S.hairColor1+' hair');
  else if(S.hairstyle) lk.push(S.hairstyle+' hair');
  if(lk.length) add('l',lk);
  // Outfit
  const ot=[];
  const wearG=[];
  if(S.clothing) wearG.push(S.clothing);
  else { if(S.clothingTop) wearG.push(S.clothingTop); if(S.clothingBottom) wearG.push(S.clothingBottom); }
  if(S.nsfw){
    if(S.nsfwTop) wearG.push(S.nsfwTop);
    if(S.nsfwBottom) wearG.push(S.nsfwBottom);
    S.nsfwClothing.forEach(function(c){
      wearG.push(NSFW_CLOTHING_PROMPTS[c.toLowerCase()] || c);
    });
  }
  if(wearG.length) ot.push('wearing '+wearG.join(', '));
  if(S.clothingAcc.length) ot.push(S.clothingAcc.join(', '));
  if(S.nsfw&&S.bodyParts.length) ot.push(...S.bodyParts);
  if(S.sockColor&&S.sockLength) ot.push(S.sockColor+' '+S.sockLength+' socks');
  else if(S.sockLength) ot.push(S.sockLength+' socks');
  if(S.shoes) ot.push(S.shoeColor ? `${S.shoeColor} ${S.shoes}` : S.shoes);
  if(S.faceAcc.length) ot.push(S.faceAcc.join(', '));
  if(ot.length) add('o',ot);
  // Mood
  const md=[];
  if(S.expression) md.push(S.expression+' expression');
  const poses=[...S.poses,...(S.nsfw?S.nsfwPose:[])];
  if(poses.length) md.push(poses.join(', '));
  if(S.effects.length) md.push(S.effects.join(', '));
  const fluids=[...S.liquids,...(S.nsfw?S.nsfwFluid:[])];
  if(fluids.length) md.push(fluids.join(', '));
  const items=[...(S.weapons||[]),...(S.props||[]),...(S.electronics||[]),...(S.otherItems||[])];
  if(items.length) md.push('holding '+items.join(', '));
  if(S.nsfw&&S.nsfwIndicator.length) md.push(...S.nsfwIndicator);
  if(md.length) add('m',md);
  // Scene
  const sc=[];
  const envs=[...(S.environment?['in '+S.environment]:[]),...(S.nsfw?S.nsfwEnv.map(e=>'in '+e):[])];
  if(envs.length) sc.push(envs.join(', '));
  if(S.era) sc.push(S.era+' style');
  if(S.style) sc.push(S.style);
  if(S.animeStudio) sc.push(S.animeStudio);
  if(S.colorGrade) sc.push(S.colorGrade);
  if(S.stroke) sc.push(S.stroke);
  if(S.shadow) sc.push(S.shadow);
  if(S.lights.length) sc.push(S.lights.join(', '));
  if(S.glow&&S.glow.toLowerCase()!=='no glow') sc.push(S.glow);
  if(S.smooth) sc.push(S.smooth);
  if(sc.length) add('s',sc);
  // Camera
  const cm=[];
  if(S.angle) cm.push(S.angle);
  if(S.shot) cm.push(S.shot);
  if(S.nsfw&&S.nsfwShot.length) cm.push(...S.nsfwShot);
  if(S.look) cm.push('looking '+S.look);
  if(S.lens) cm.push(S.lens+' lens');
  if(S.lensEffect&&S.lensEffect.toLowerCase()!=='none') cm.push(S.lensEffect);
  if(cm.length) add('cam',cm);
  return G;
}

/* ── Weight Slider ── */
let activeTip = null;

function closeWeightTip(){
  if(activeTip){ activeTip.remove(); activeTip=null; }
  document.querySelectorAll('.ps.w-open').forEach(x=>x.classList.remove('w-open'));
}

function showWeightSlider(chip, key, label){
  // Toggle off if already open on this chip
  if(activeTip && activeTip._key === key){ closeWeightTip(); return; }
  closeWeightTip();

  const tip = document.createElement('div');
  tip.className = 'w-slider-tip';
  tip._key = key;
  activeTip = tip;
  chip.classList.add('w-open');

  // Header row: tag label + close button
  const tipHd = document.createElement('div');
  tipHd.className = 'w-tip-hd';
  const tagLbl = document.createElement('div');
  tagLbl.className = 'w-tip-tag';
  tagLbl.textContent = '⚖ ' + label;
  const closeX = document.createElement('button');
  closeX.className = 'w-tip-close';
  closeX.innerHTML = '&#x2715;';
  closeX.title = 'Close';
  closeX.addEventListener('click', e=>{ e.stopPropagation(); closeWeightTip(); });
  tipHd.appendChild(tagLbl);
  tipHd.appendChild(closeX);
  tip.appendChild(tipHd);

  // Slider row
  const row = document.createElement('div');
  row.className = 'w-tip-row';

  const valLbl = document.createElement('div');
  valLbl.className = 'w-tip-val';
  const curW = S.weights[key] || 1.0;
  valLbl.textContent = curW.toFixed(1);

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.className = 'w-tip-slider';
  slider.min = '0.1'; slider.max = '2.0'; slider.step = '0.1';
  slider.value = curW;

  function updatePct(){
    const pct = ((slider.value - 0.1) / (2.0 - 0.1)) * 100;
    slider.style.setProperty('--pct', pct.toFixed(1) + '%');
  }
  updatePct();

  function applyVal(v){
    const val = Math.round(v * 10) / 10;
    S.weights[key] = val;
    valLbl.textContent = val.toFixed(1);
    slider.value = val;
    updatePct();
    // Update badge on chip
    const badge = chip.querySelector('.ps-wbadge');
    if(badge){
      badge.textContent = val.toFixed(1);
      badge.className = 'ps-wbadge' + (val > 1 ? ' hi' : val < 1 ? ' lo' : '');
      badge.style.display = val === 1.0 ? 'none' : '';
    }
    // Update preset buttons
    tip.querySelectorAll('.w-tip-pre').forEach(b=>{
      b.classList.toggle('on', parseFloat(b.dataset.v) === val);
    });
    rebuild();
  }

  slider.addEventListener('input', ()=> applyVal(parseFloat(slider.value)));
  row.appendChild(valLbl);
  row.appendChild(slider);
  tip.appendChild(row);

  // Reset button
  const reset = document.createElement('button');
  reset.className = 'w-tip-reset';
  reset.textContent = '✕ Reset to 1.0';
  reset.addEventListener('click', e=>{
    e.stopPropagation();
    delete S.weights[key];
    closeWeightTip();
    rebuild();
  });
  tip.appendChild(reset);

  document.body.appendChild(tip);

  // Position below chip
  const rect = chip.getBoundingClientRect();
  const tipW = 198;
  let left = rect.left;
  let top  = rect.bottom + 6;
  if(left + tipW > window.innerWidth - 8) left = window.innerWidth - tipW - 8;
  if(top + 170 > window.innerHeight) top = rect.top - 170;
  tip.style.left = left + 'px';
  tip.style.top  = top  + 'px';

  // Close on outside click
  setTimeout(()=>{
    document.addEventListener('click', function handler(e){
      if(!tip.contains(e.target) && e.target !== chip){
        closeWeightTip();
        document.removeEventListener('click', handler);
      }
    });
  }, 10);
}

/* Remove an auto-generated chip by matching its text to state */
function _chipRemoveAuto(text){
  const t = text.toLowerCase().trim();

  /* _safeReflect: reflectUI handles globals, csReflectButtons handles per-char */
  function _safeReflect(){
    reflectUI();
    if(typeof csReflectButtons === 'function') csReflectButtons();
  }

  /* helper: turn off all .ob buttons in a grid */
  function offGrid(gid){
    const g=document.getElementById(gid);
    if(g) g.querySelectorAll('.ob').forEach(function(b){
      b.classList.remove('on');
      var bar=b.querySelector('.hcp-bar'); if(bar) bar.style.background='transparent';
    });
  }
  /* helper: turn off all .cb buttons in a grid */
  function offCb(gid){
    const g=document.getElementById(gid);
    if(g) g.querySelectorAll('.cb').forEach(function(b){
      b.classList.remove('on'); b.style.borderColor='transparent';
    });
  }
  /* helper: null scalar + off grid */
  function clearScalar(key, gid){
    S[key]=null;
    if(gid) offGrid(gid);
  }
  /* helper: clear array + off grid */
  function clearArr(key, gid){
    S[key]=[];
    if(gid) offGrid(gid);
  }

  /* Quality */
  if(S.quality.length){
    const qi = S.quality.findIndex(q=>t.includes(q.toLowerCase()));
    if(qi>=0){ S.quality.splice(qi,1); offGrid('qualityGrid'); _safeReflect(); rebuild(); return; }
  }

  /* Look — hair */
  if(t.includes('hair')){
    clearScalar('hairColor1', null); clearScalar('hairstyle','hairstyleGrid');
    // clear hcp-bars on hairstyleGrid
    const hg=document.getElementById('hairstyleGrid');
    if(hg) hg.querySelectorAll('.hcp-bar').forEach(function(b){b.style.background='transparent';});
    _safeReflect(); rebuild(); return;
  }
  /* Look — eyes */
  if(t.includes(' eye') || t.endsWith('eyes')){
    clearScalar('eyeColor', null); clearScalar('eyeShape','eyeShapeGrid');
    const eg=document.getElementById('eyeShapeGrid');
    if(eg) eg.querySelectorAll('.hcp-bar').forEach(function(b){b.style.background='transparent';});
    _safeReflect(); rebuild(); return;
  }

  /* Single scalar fields */
  const scalarMap = {
    age:'ageGrid', body:'bodyGrid', skin:'skinGrid',
    expression:'expressionGrid',
    clothing:'clothingGrid', clothingTop:'clothingTopGrid', clothingBottom:'clothingBottomGrid',
    environment:'environmentGrid', era:'eraGrid', style:'styleGrid',
    animeStudio:'animeStudioGrid', colorGrade:'colorGradeGrid',
    stroke:'strokeGrid', shadow:'shadowGrid', glow:'glowGrid', smooth:'smoothGrid',
    angle:'angleGrid', shot:'shotGrid', look:'lookGrid', lens:'lensGrid',
    lensEffect:'lensEffectGrid', sockLength:'sockLengthGrid', shoes:'shoesGrid',
    charCount:null
  };
  for(const [k,gid] of Object.entries(scalarMap)){
    if(S[k] && t.includes(String(S[k]).toLowerCase())){
      clearScalar(k, gid);
      _safeReflect(); rebuild(); return;
    }
  }

  /* Arrays */
  const arrMap = {
    nsfwBody:'nsfwBodyGrid', nsfwPose:'nsfwPoseGrid', nsfwFluid:'nsfwFluidGrid',
    nsfwIndicator:'nsfwIndicatorGrid', nsfwShot:'nsfwShotGrid', nsfwEnv:'nsfwEnvGrid',
    nsfwClothing:'nsfwClothingGrid',
    clothingAcc:'clothingAccGrid', faceAcc:'faceAccGrid', bodyParts:'bodyPartsGrid',
    lights:'lightGrid', poses:'poseGrid', effects:'effectsGrid', liquids:'liquidsGrid',
    weapons:'weaponGrid', props:'propsGrid', electronics:'electronicsGrid', otherItems:'otherItemsGrid'
  };
  for(const [k,gid] of Object.entries(arrMap)){
    if(Array.isArray(S[k]) && S[k].length){
      const before = S[k].length;
      S[k] = S[k].filter(v=>!t.includes(String(v).toLowerCase()));
      if(S[k].length < before){
        // turn off deselected buttons
        const g=document.getElementById(gid);
        if(g) g.querySelectorAll('.ob').forEach(function(b){
          const v=(b.getAttribute('data-val')||'').toLowerCase();
          if(v && !S[k].map(x=>String(x).toLowerCase()).includes(v)){
            b.classList.remove('on');
          }
        });
        _safeReflect(); rebuild(); return;
      }
    }
  }

  /* wearing ... */
  if(t.startsWith('wearing')){
    clearScalar('clothing','clothingGrid'); clearScalar('clothingTop','clothingTopGrid');
    clearScalar('clothingBottom','clothingBottomGrid');
    clearScalar('nsfwTop','nsfwTopGrid'); clearScalar('nsfwBottom','nsfwBottomGrid');
    clearArr('nsfwClothing','nsfwClothingGrid');
    _safeReflect(); rebuild(); return;
  }
  /* socks */
  if(t.includes('sock')){ clearScalar('sockLength','sockLengthGrid'); S.sockColor=null; _safeReflect(); rebuild(); return; }
  /* holding */
  if(t.startsWith('holding')){
    clearArr('weapons','weaponGrid'); clearArr('props','propsGrid');
    clearArr('electronics','electronicsGrid'); clearArr('otherItems','otherItemsGrid');
    _safeReflect(); rebuild(); return;
  }
  /* in + environment */
  if(t.startsWith('in ')){ clearScalar('environment','environmentGrid'); _safeReflect(); rebuild(); return; }
  /* looking */
  if(t.startsWith('looking')){ clearScalar('look','lookGrid'); _safeReflect(); rebuild(); return; }
  /* lens */
  if(t.includes('lens')){ clearScalar('lens','lensGrid'); clearScalar('lensEffect','lensEffectGrid'); _safeReflect(); rebuild(); return; }

  _safeReflect(); rebuild();
}

function makeWeightedChip(text, cls, removeFn){
  const key = text.toLowerCase();
  const w   = S.weights[key] || 1.0;

  const sp = document.createElement('span');
  sp.className = 'ps ' + cls;
  sp.dataset.wkey = key;

  const lbl = document.createElement('span');
  lbl.className = 'ps-txt';
  lbl.textContent = text;
  sp.appendChild(lbl);

  const badge = document.createElement('span');
  badge.className = 'ps-wbadge' + (w > 1 ? ' hi' : w < 1 ? ' lo' : '');
  badge.textContent = w.toFixed(1);
  badge.style.display = w === 1.0 ? 'none' : '';
  sp.appendChild(badge);

  /* ✕ remove button — always shown */
  const xbtn = document.createElement('span');
  xbtn.className = 'ps-remove';
  xbtn.innerHTML = '&times;';
  xbtn.title = 'Remove';
  xbtn.addEventListener('mousedown', e=>{ e.preventDefault(); e.stopPropagation(); });
  xbtn.addEventListener('click', e=>{
    e.preventDefault();
    e.stopPropagation();
    if(removeFn){ removeFn(); }
    else { _chipRemoveAuto(text); }
  });
  sp.appendChild(xbtn);

  sp.addEventListener('click', e=>{
    if(e.target.classList.contains('ps-remove')) return;
    e.stopPropagation();
    showWeightSlider(sp, key, text);
  });

  return sp;
}

function renderPromptChips(el, groups, extraArr, negCls){
  el.innerHTML='';
  if(!groups.length&&!extraArr.length){
    el.className='ptxt'+(negCls?' neg':'')+' empty';
    el.textContent=negCls?(typeof t==='function'?t('neg_empty'):'Select avoids above, or add in the box below…'):(typeof t==='function'?t('prompt_empty'):'Start selecting options on the left…');
    return;
  }
  el.className='ptxt'+(negCls?' neg':'');
  groups.forEach(g=>{
    g.items.forEach(item=>{
      let removeFn = null;
      /* For negative auto chips — build removeFn based on src */
      if(negCls && g.src){
        const src = g.src;
        const val = item.toLowerCase();
        removeFn = ()=>{
          if(src==='negatives'){ S.negatives = S.negatives.filter(v=>v.toLowerCase()!==val); }
          else if(src==='negBody'){
            S.negBody = S.negBody.filter(v=>v.toLowerCase()!==val);
            const g2=document.getElementById('negBodyGrid');
            if(g2) g2.querySelectorAll('.ob').forEach(b=>{ if((b.getAttribute('data-val')||'').toLowerCase()===val) b.classList.remove('on'); });
          }
          else if(src==='negQuality'){
            S.negQuality = S.negQuality.filter(v=>v.toLowerCase()!==val);
            const g2=document.getElementById('negQualityGrid');
            if(g2) g2.querySelectorAll('.ob').forEach(b=>{ if((b.getAttribute('data-val')||'').toLowerCase()===val) b.classList.remove('on'); });
          }
          delete S.weights[val];
          rebuild();
        };
      }
      el.appendChild(makeWeightedChip(item, 'ps-'+(negCls?'n':g.cls), removeFn));
    });
  });
  extraArr.forEach((t,i)=>{
    const removeFn = ()=>{
      if(negCls){ S.extraNeg.splice(i,1); } else { S.extraPos.splice(i,1); }
      delete S.weights[t.toLowerCase()];
      rebuild();
    };
    el.appendChild(makeWeightedChip(t, negCls?'ps-n':'ps-usr', removeFn));
  });
}

function rebuild(){
  // Auto-fix conflicts — resolveConflicts handles UI sync for affected buttons only
  resolveConflicts();

  const pos=buildPosText();
  const pe=document.getElementById('promptText');
  const ne=document.getElementById('negativeText');

  // Positive — colored chips
  const groups=buildPosGroups();
  renderPromptChips(pe,groups,S.extraPos,false);
  if(!pos&&!S.extraPos.length){
    document.getElementById('posWC').textContent='';
  } else {
    pe.classList.add('flash');
    setTimeout(()=>pe.classList.remove('flash'),500);
    document.getElementById('posWC').textContent=(pos.split(',').length+S.extraPos.length)+' '+(typeof t==='function'?t('tags'):'tags');
  }

  // Negative
  const hasNeg=S.negatives.length>0||S.negBody.length>0||S.negQuality.length>0||S.extraNeg.length>0;
  if(hasNeg){
    const negItems=[
      ...S.negatives.map(n=>({cls:'n',items:[n],src:'negatives'})),
      ...S.negBody.map(n=>({cls:'n',items:[n],src:'negBody'})),
      ...S.negQuality.map(n=>({cls:'n',items:[n],src:'negQuality'}))
    ];
    renderPromptChips(ne, negItems, S.extraNeg, true);
    ne.classList.add('flash');
    setTimeout(()=>ne.classList.remove('flash'),500);
    document.getElementById('negWC').textContent=(S.negatives.length+S.negBody.length+S.negQuality.length+S.extraNeg.length)+' '+(typeof t==='function'?t('tags'):'tags');
  } else {
    ne.className='ptxt neg empty';
    ne.textContent = (typeof t==='function') ? t('neg_empty') : 'Select avoids above, or add in the box below…';
    document.getElementById('negWC').textContent='';
  }

  updateBlueprint();
  if(window.updateBlueprintDisplay) window.updateBlueprintDisplay();
  updateCounter();
  /* patch card tags/indicators — safe: never destroys focused inputs */
  if(typeof renderCharCards === 'function') renderCharCards();
}

/* ═══════════════════════════════════
   BLUEPRINT UPDATE
═══════════════════════════════════ */
function updateBlueprint(){
  let n=0;
  BP_CELLS.forEach(cell=>{
    const el=document.getElementById(cell.id);if(!el)return;
    const active=cell.keys.some(k=>{
      if(k==='characters') return S.characters.some(Boolean);
      return Array.isArray(S[k])?S[k].length>0:!!S[k];
    });
    const was=el.classList.contains('on');
    el.classList.toggle('on',active);
    const valEl=el.querySelector('.bp-val');
    if(active){
      n++;
      if(valEl){
        const fk=cell.keys.find(k=>Array.isArray(S[k])?S[k].length>0:!!S[k]);
        const raw=fk?(Array.isArray(S[fk])?S[fk][0]:S[fk]):'';
        valEl.textContent=(raw||'✓').replace(/,.*/,'').substring(0,13);
      }
      if(!was){el.classList.add('pop');setTimeout(()=>el.classList.remove('pop'),280);}
    } else {
      if(valEl)valEl.textContent='—';
    }
  });
  const pct=Math.round(n/BP_CELLS.length*100);
  const fill=document.getElementById('bpFill');if(fill)fill.style.width=pct+'%';
  const lbl=document.getElementById('bpPct');if(lbl)lbl.textContent=pct+'%';
}
/* ═══════════════════════════════════
   COUNTER
═══════════════════════════════════ */
function buildCounterDots(){} // legacy stub — replaced by PSM

function analyzePrompt(){
  const issues = [];
  let score = 0;

  /* ── SCORING: points for coverage ── */
  // Core character (30pts)
  if(S.age || S.charCount || S.characters.some(Boolean)) score += 5;
  if(S.skin || S.body)          score += 5;
  if(S.hairColor1 || S.hairstyle) score += 7;
  if(S.eyeColor  || S.eyeShape)   score += 5;
  if(S.clothing || S.clothingTop || S.clothingBottom || S.nsfwClothing.length) score += 8;

  // Style (25pts)
  if(S.style || S.animeStudio)  score += 10;
  if(S.era)                     score += 5;
  if(S.colorGrade)               score += 5;
  if(S.stroke)                  score += 5;

  // Scene / Camera (20pts)
  if(S.environment)             score += 7;
  if(S.shot)                    score += 6;
  if(S.angle)                   score += 4;
  if(S.look)                    score += 3;

  // Lighting / Quality (25pts)
  if(S.quality.length >= 2)     score += 10;
  else if(S.quality.length === 1) score += 5;
  if(S.lights.length)           score += 10;
  if(S.glow && S.glow !== 'no glow') score += 3;
  if(S.shadow && S.shadow !== 'no shadows') score += 2;

  // Mood / Expression bonus (up to 5 extra)
  if(S.expression)  score = Math.min(100, score + 3);
  if(S.poses.length) score = Math.min(100, score + 2);

  score = Math.min(100, score);

  /* ── CONFLICTS: opposing choices ── */
  // Shadow conflicts
  if(S.shadow === 'no shadows' &&
     S.lights.some(x=>['rim light','backlight','neon light','moonlight','candlelight'].includes(x)))
    issues.push({type:'conflict', icon:'fa-circle-xmark', msg:'"No Shadows" contradicts dramatic lighting'});

  // Glow conflicts with B&W
  if(S.glow && S.glow !== 'no glow' && S.colorGrade === 'black & white')
    issues.push({type:'conflict', icon:'fa-circle-xmark', msg:'Colored glow conflicts with Black & White palette'});

  // Style + Chibi + dramatic camera
  if(S.style === 'chibi' && S.shot === 'extreme closeup')
    issues.push({type:'conflict', icon:'fa-circle-xmark', msg:'Chibi style + Extreme Closeup can distort proportions'});

  /* ── OVERLOAD: too many of the same category ── */
  const totalStyles = (S.style?1:0) + (S.animeStudio?1:0) + (S.era?1:0);
  if(totalStyles >= 3)
    issues.push({type:'overload', icon:'fa-triangle-exclamation', msg:'3 style modifiers at once may confuse the model'});

  if(S.lights.length >= 4)
    issues.push({type:'overload', icon:'fa-triangle-exclamation', msg:`${S.lights.length} lighting types — 1-2 is usually enough`});

  if(S.effects.length >= 4)
    issues.push({type:'overload', icon:'fa-triangle-exclamation', msg:`${S.effects.length} effects — may overwhelm composition`});

  if(S.quality.length >= 6)
    issues.push({type:'overload', icon:'fa-triangle-exclamation', msg:'Too many quality tags — 3-4 is optimal'});

  const totalActions = S.poses.length + S.effects.length + S.liquids.length;
  if(totalActions >= 6)
    issues.push({type:'overload', icon:'fa-triangle-exclamation', msg:'Many pose/effect/liquid tags — model may struggle to combine them'});

  /* ── MISSING: important gaps ── */
  if(!S.quality.length)
    issues.push({type:'missing', icon:'fa-circle-info', msg:'No quality tags — add Masterpiece, Best Quality etc.'});

  if(!S.lights.length && !S.glow)
    issues.push({type:'missing', icon:'fa-circle-info', msg:'No lighting — strongly affects image mood'});

  if(!S.style && !S.animeStudio)
    issues.push({type:'missing', icon:'fa-circle-info', msg:'No art style or studio — model uses default'});

  if(!S.shot && !S.angle)
    issues.push({type:'missing', icon:'fa-circle-info', msg:'No camera set — add Shot Range or Angle'});

  /* ── RENDER ── */
  const fillEl  = document.getElementById('psmFill');
  const scoreEl = document.getElementById('psmScore');
  const gradeEl = document.getElementById('psmGrade');
  const issuesEl= document.getElementById('psmIssues');
  if(!fillEl) return;

  // Penalize score for conflicts/overloads
  const conflicts = issues.filter(x=>x.type==='conflict').length;
  const overloads = issues.filter(x=>x.type==='overload').length;
  const penalized = Math.max(0, score - conflicts*12 - overloads*5);

  fillEl.style.width = penalized + '%';

  // Color bar by score
  if(penalized >= 85)      fillEl.style.background='linear-gradient(90deg,#6366f1,#a855f7)';
  else if(penalized >= 65) fillEl.style.background='linear-gradient(90deg,#22c55e,#4ade80)';
  else if(penalized >= 45) fillEl.style.background='linear-gradient(90deg,#eab308,#fbbf24)';
  else if(penalized >= 25) fillEl.style.background='linear-gradient(90deg,#f97316,#fb923c)';
  else                     fillEl.style.background='linear-gradient(90deg,#ef4444,#f87171)';

  scoreEl.textContent = penalized;

  const grades = [
    [85,'g-pro',  '✦ Pro'],
    [65,'g-strong','Strong'],
    [45,'g-good',  'Good'],
    [25,'g-fair',  'Fair'],
    [0, 'g-weak',  'Weak'],
  ];
  const [,gcls,gtxt] = grades.find(([min])=>penalized>=min);
  gradeEl.className = 'psm-grade ' + gcls;
  gradeEl.textContent = gtxt;

  // Render issues (max 3 shown — most critical first)
  issuesEl.innerHTML = '';
  const priority = ['conflict','overload','missing'];
  const sorted = [...issues].sort((a,b)=>priority.indexOf(a.type)-priority.indexOf(b.type));
  sorted.slice(0,3).forEach(iss=>{
    const row = document.createElement('div');
    row.className = 'psm-issue ' + iss.type;
    row.innerHTML = `<i class="fas ${iss.icon}"></i><span>${iss.msg}</span>`;
    issuesEl.appendChild(row);
  });
}

function updateCounter(){ analyzePrompt(); } // keep old call sites working

/* ═══════════════════════════════════
   FAVOURITES & PRESETS
═══════════════════════════════════ */
function renderFavList(){
  const list=document.getElementById('favList');
  list.innerHTML='';
  if(!S.favourites.length){list.innerHTML='<div class="fav-empty" data-i18n="fav_empty">No saved favourites yet</div>';return;}
  S.favourites.forEach((f,i)=>{
    const item=document.createElement('div');
    item.className='fav-item';
    item.innerHTML=`
      <div class="fav-item-top">
        <span class="fav-item-name">⭐ ${f.name}</span>
        <span class="fav-item-date">${f.date}</span>
        <span class="fav-item-del" title="Delete">✕</span>
      </div>
      <div class="fav-item-pos">${f.pos}</div>
    `;
    item.addEventListener('click',e=>{
      if(e.target.classList.contains('fav-item-del'))return;

      if(f.state){
        // ── 1. صفّر UI وS بصمت ──
        resetAll(true);

        // ── 2. ضع الـ state مباشرة في S ──
        const favs = S.favourites;
        Object.assign(S, JSON.parse(JSON.stringify(f.state)));
        S.favourites = favs;

        // ── 3. ارسم الأزرار من S بدون click() ──

        // Single-select
        const SM={
          charCountGrid:'charCount', ageGrid:'age', bodyGrid:'body',
          hairstyleGrid:'hairstyle', eyeShapeGrid:'eyeShape',
          clothingGrid:'clothing', clothingTopGrid:'clothingTop', clothingBottomGrid:'clothingBottom',
          nsfwTopGrid:'nsfwTop', nsfwBottomGrid:'nsfwBottom',
          sockLengthGrid:'sockLength', shoesGrid:'shoes', expressionGrid:'expression',
          envGrid:'environment', styleGrid:'style', eraGrid:'era', animeStudioGrid:'animeStudio',
          strokeGrid:'stroke', shadowGrid:'shadow', glowGrid:'glow', smoothGrid:'smooth',
          angleGrid:'angle', shotGrid:'shot', lookGrid:'look', lensGrid:'lens',
          lensEffectGrid:'lensEffect', colorGradeGrid:'colorGrade'
        };
        Object.entries(SM).forEach(([gid,sk])=>{
          if(!S[sk]) return;
          const g=document.getElementById(gid); if(!g) return;
          const sv=String(S[sk]).toLowerCase();
          g.querySelectorAll('.ob').forEach(b=>{
            const dv=(b.getAttribute('data-val')||'').toLowerCase();
            if(dv && dv===sv) b.classList.add('on');
          });
        });

        // Multi-select
        const MM={
          clothingAccGrid:'clothingAcc', clothingConditionGrid:'clothingCondition',
          faceAccGrid:'faceAcc', poseGrid:'poses', effectsGrid:'effects',
          liquidsGrid:'liquids', weaponGrid:'weapons', propsGrid:'props',
          electronicsGrid:'electronics', otherItemsGrid:'otherItems',
          qualityGrid:'quality', lightGrid:'lights', negativeGrid:'negatives',
          negBodyGrid:'negBody', negQualityGrid:'negQuality', bodyPartsGrid:'bodyParts',
          nsfwBodyGrid:'nsfwBody', nsfwClothingGrid:'nsfwClothing', nsfwPoseGrid:'nsfwPose',
          nsfwFluidGrid:'nsfwFluid', nsfwEnvGrid:'nsfwEnv',
          nsfwIndicatorGrid:'nsfwIndicator', nsfwShotGrid:'nsfwShot'
        };
        Object.entries(MM).forEach(([gid,sk])=>{
          if(!S[sk]||!S[sk].length) return;
          const g=document.getElementById(gid); if(!g) return;
          const vals=S[sk].map(v=>String(v).toLowerCase());
          g.querySelectorAll('.ob').forEach(b=>{
            const dv=(b.getAttribute('data-val')||'').toLowerCase();
            if(dv && vals.includes(dv)) b.classList.add('on');
          });
        });

        // Hair / Eye colors
        // Hair/Eye colour bars — update on hairstyle/eyeShape buttons
        if(typeof _updateColorDot==='function'){
          _updateColorDot('hairColor1');
          _updateColorDot('eyeColor');
        }

        // Skin
        document.querySelectorAll('.sb').forEach(b=>{
          const bv=b.getAttribute('data-val');
          const on=bv===S.skin;
          b.classList.toggle('on',on);
          b.style.borderColor=on?'white':(SKINS.find(s=>s.val===bv)?.bg||'transparent');
        });

        // Color bars
        ['clothingColor','clothingTopColor','clothingBottomColor',
         'nsfwTopColor','nsfwBottomColor','nsfwClothingColor',
         'sockColor','shoeColor','clothingAccColor','faceAccColor',
         'hairColor1','eyeColor'].forEach(k=>_updateColorDot(k));

        // NSFW
        if(S.nsfw){
          sessionStorage.setItem('aps_age_confirmed','1');
          document.getElementById('nsfwBtn').classList.add('on');
          toggleNSFW(true);
        }

        // ── 4. أعد بناء الـ prompt ──
        rebuild();

      } else {
        // المفضلة القديمة بدون state — أبلغ المستخدم
        toast('⚠️ Old save — please delete and re-save to restore buttons','warn');
      }

      document.getElementById('favDropdown').classList.remove('open');
      toast('✅ Loaded: '+f.name);
    });
    item.querySelector('.fav-item-del').addEventListener('click',(e)=>{
      e.stopPropagation();
      const docId = S.favourites[i]?._docId;
      S.favourites.splice(i,1);
      localStorage.setItem('aps6Favs',JSON.stringify(S.favourites));
      renderFavList();
      const u = window._currentUser;
      if(u && docId && window._fbFavs){
        window._fbFavs.del(u.uid, docId).catch(console.warn);
      }
    });
    list.appendChild(item);
  });
}



/* Reflect loaded state back onto buttons */
function reflectUI(){
  /* Per-character grids — these are EXCLUSIVELY managed by csReflectButtons().
     reflectUI must never touch them, otherwise it corrupts the per-slot state. */
  var PER_CHAR_GRIDS = {
    hairstyleGrid:1, eyeShapeGrid:1,
    skinGrid:1, bodyGrid:1, ageGrid:1,
    clothingGrid:1, clothingTopGrid:1, clothingBottomGrid:1,
    nsfwTopGrid:1, nsfwBottomGrid:1,
    sockLengthGrid:1, shoesGrid:1, expressionGrid:1,
    clothingAccGrid:1, clothingConditionGrid:1, faceAccGrid:1,
    poseGrid:1, effectsGrid:1, liquidsGrid:1,
    weaponGrid:1, propsGrid:1, electronicsGrid:1, otherItemsGrid:1,
    nsfwBodyGrid:1, nsfwClothingGrid:1, nsfwPoseGrid:1, nsfwFluidGrid:1, nsfwIndicatorGrid:1,
    bodyPartsGrid:1
  };

  // Clear .on only on NON-per-char .ob buttons
  // Use parentElement chain to find the direct grid container (has class 'og' or 'skin-grid')
  document.querySelectorAll('.ob').forEach(b=>{
    // Walk up to find the containing grid div (direct parent with an id)
    var el = b.parentElement;
    var gid = null;
    while(el && el !== document.body){
      if(el.id && (el.classList.contains('og') || el.classList.contains('skin-grid') ||
                   el.id.endsWith('Grid') || el.id.endsWith('grid'))){
        gid = el.id; break;
      }
      el = el.parentElement;
    }
    if(gid && PER_CHAR_GRIDS[gid]) return; // skip per-char grids
    b.classList.remove('on');
  });
  document.querySelectorAll('.cw,.cb').forEach(w=>{w.classList.remove('on');if(w.classList.contains('cb'))w.style.borderColor='transparent';});
  // Do NOT touch .sb (skin) — handled by csReflectButtons

  // Scene / Camera / Quality / Global singles only
  // NOTE: ageGrid and bodyGrid are per-character — handled by csReflectButtons
  const singleMap={
    charCountGrid:'charCount',
    envGrid:'environment', styleGrid:'style', eraGrid:'era', animeStudioGrid:'animeStudio',
    strokeGrid:'stroke', shadowGrid:'shadow', glowGrid:'glow', smoothGrid:'smooth',
    angleGrid:'angle', shotGrid:'shot', lookGrid:'look', lensGrid:'lens', lensEffectGrid:'lensEffect',
    colorGradeGrid:'colorGrade'
  };
  Object.entries(singleMap).forEach(([gid,k])=>{
    if(!S[k])return;
    const g=document.getElementById(gid);if(!g)return;
    const sv=String(S[k]).toLowerCase();
    g.querySelectorAll('.ob').forEach(b=>{
      const bv=(b.getAttribute('data-val')||b.querySelector('span')?.textContent||'').toLowerCase();
      if(bv===sv) b.classList.add('on');
    });
  });

  // Global multi-select only
  const multiMap={
    qualityGrid:'quality', lightGrid:'lights',
    negBodyGrid:'negBody', negQualityGrid:'negQuality',
    nsfwEnvGrid:'nsfwEnv', nsfwShotGrid:'nsfwShot'
  };
  Object.entries(multiMap).forEach(([gid,k])=>{
    const g=document.getElementById(gid);if(!g)return;
    g.querySelectorAll('.ob').forEach(b=>{
      const bv=(b.getAttribute('data-val')||b.querySelector('span')?.textContent||'').toLowerCase();
      if(S[k]&&S[k].map(v=>String(v).toLowerCase()).includes(bv)) b.classList.add('on');
    });
  });

  // NSFW toggle only
  const nsfwBtn = document.getElementById('nsfwBtn');
  if(nsfwBtn) nsfwBtn.classList.toggle('on',S.nsfw);
  toggleNSFW(S.nsfw);
}

/* ═══════════════════════════════════
   MODAL
═══════════════════════════════════ */
let _modalCb=null;
function openModal(title,sub,defaultVal,cb){
  _modalCb=cb;
  document.getElementById('modalTitle').textContent=title;
  document.getElementById('modalSub').textContent=sub;
  document.getElementById('modalInput').value=defaultVal||'';
  document.getElementById('modalOverlay').classList.add('open');
  setTimeout(()=>document.getElementById('modalInput').focus(),100);
}
document.addEventListener('DOMContentLoaded',()=>{},false);
function initModal(){
  document.getElementById('modalOk').addEventListener('click',()=>{
    const v=document.getElementById('modalInput').value.trim();
    document.getElementById('modalOverlay').classList.remove('open');
    if(_modalCb) _modalCb(v);
  });
  document.getElementById('modalCancel').addEventListener('click',()=>document.getElementById('modalOverlay').classList.remove('open'));
  document.getElementById('modalOverlay').addEventListener('click',e=>{if(e.target===document.getElementById('modalOverlay'))document.getElementById('modalOverlay').classList.remove('open');});
  document.getElementById('modalInput').addEventListener('keydown',e=>{
    if(e.key==='Enter'){document.getElementById('modalOk').click();}
    if(e.key==='Escape'){document.getElementById('modalCancel').click();}
  });

  // Info tray toggle
  const infoTray = document.getElementById('infoTray');
  document.getElementById('infoMenuBtn').addEventListener('click', e=>{
    e.stopPropagation();
    infoTray.classList.toggle('open');
  });
  document.addEventListener('click', ()=> infoTray.classList.remove('open'));
  infoTray.addEventListener('click', e=> e.stopPropagation());

  // Info tray → modals
  document.getElementById('infoAbout').addEventListener('click',()=>{
    infoTray.classList.remove('open');
    document.getElementById('aboutOverlay').classList.add('open');
  });
  document.getElementById('infoFeatures').addEventListener('click',()=>{
    infoTray.classList.remove('open');
    document.getElementById('featuresOverlay').classList.add('open');
  });
  document.getElementById('infoTips').addEventListener('click',()=>{
    infoTray.classList.remove('open');
    document.getElementById('tipsOverlay').classList.add('open');
  });

  // Footer modals — close buttons and overlay click
  ['about','features','tips'].forEach(id=>{
    const overlay = document.getElementById(id+'Overlay');
    document.getElementById(id+'Close').addEventListener('click',()=>overlay.classList.remove('open'));
    overlay.addEventListener('click',e=>{ if(e.target===overlay) overlay.classList.remove('open'); });
  });

  // Close all on Escape
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      ['about','features','tips'].forEach(id=> document.getElementById(id+'Overlay').classList.remove('open'));
      infoTray.classList.remove('open');
    }
  });
}

/* ═══════════════════════════════════
   RANDOM / BUILTIN PRESETS
═══════════════════════════════════ */
function pick(a){return a[Math.floor(Math.random()*a.length)];}
function pickN(a,n){const s=[...a];const r=[];for(let i=0;i<n&&s.length;i++){const x=Math.floor(Math.random()*s.length);r.push(s.splice(x,1)[0]);}return r;}
function maybe(prob){return Math.random()<prob;}

/* ═══════════════════════════════════
   CONFLICT RESOLVER
   Called after every selection + randomize
═══════════════════════════════════ */
function resolveConflicts(_silent=false){
  const conflicts=[];
  // cf = hard conflict → shows toast notification
  // sw = silent swap → auto-replaces without notification (natural mutual exclusion)
  const cf=(a,b)=>{ if(!_silent) conflicts.push([a,b]); };
  const sw=()=>{}; // silent — no toast, just state change + _syncGrid

  // ─── 1. CLOTHING LOGIC ───────────────────────────────────────────
  // NOTE: Full Outfit ↔ Top/Bottom mutual exclusion is handled by
  // _initClothingMutualExclusion (click handlers), NOT here.
  // resolveConflicts only handles INCOMPATIBILITY conflicts.

  const isSwimFull = S.clothing && ['swimsuit','one-piece swimsuit'].includes(S.clothing);
  const isFormalFull = S.clothing && ['formal suit','blazer & pants','little black dress','evening gown','wedding dress'].includes(S.clothing);
  const isArmorFull  = S.clothing && ['military uniform','fantasy armor','ninja outfit'].includes(S.clothing);


  // ─── 1. CLOTHING CONFLICTS ────────────────────────────────────────
  const nsfwThemed    = ['bunny suit','nurse outfit','police costume','french maid','cheerleader'];
  const nsfwSwim      = ['swimwear','bikini','micro bikini'];
  const nsfwCoverFull = ['lingerie','pasties only'];
  const swimBottomConflicts = ['jeans','skinny jeans','wide-leg jeans','ripped jeans',
    'shorts','denim shorts','mini shorts','high-waist shorts','jogger pants',
    'sweatpants','cargo pants','leggings','pleated skirt','mini skirt',
    'plaid skirt','long skirt','denim skirt'];

  // nsfwClothing = single-select across ALL groups — keep last picked, silent swap
  if(S.nsfwClothing.length > 1){
    const keep = S.nsfwClothing[S.nsfwClothing.length - 1];
    sw(); S.nsfwClothing = [keep];
    _syncGrid('nsfwClothingGrid', v => S.nsfwClothing.includes(v));
  }
  // nsfwTop/nsfwBottom are single-select — no cap needed

  // NSFW replaces SFW counterpart — silent swap (natural behaviour)
  const hasThemedNsfw = S.nsfwClothing.some(x => nsfwThemed.includes(x));
  const hasSwimNsfw   = S.nsfwClothing.some(x => nsfwSwim.includes(x));
  const hasCoverNsfw  = S.nsfwClothing.some(x => nsfwCoverFull.includes(x));

  if(S.nsfwTop && S.clothingTop){
    sw(); S.clothingTop = null;
    _syncGrid('clothingTopGrid', () => false);
  }
  if(S.nsfwBottom && S.clothingBottom){
    sw(); S.clothingBottom = null;
    _syncGrid('clothingBottomGrid', () => false);
  }
  if(hasSwimNsfw && S.clothingBottom && swimBottomConflicts.includes(S.clothingBottom)){
    sw(); S.clothingBottom = null;
    _syncGrid('clothingBottomGrid', () => false);
  }
  if(hasThemedNsfw && S.clothing){
    const sfwFullConflict = ['school uniform','sailor uniform','magical girl','maid outfit',
      'gothic lolita','idol outfit','fantasy armor','ninja outfit','military uniform',
      'formal suit','blazer & pants','little black dress','evening gown','wedding dress'];
    if(sfwFullConflict.includes(S.clothing)){
      cf(S.clothing, S.nsfwClothing.find(x=>nsfwThemed.includes(x)));
      S.nsfwClothing = S.nsfwClothing.filter(x => !nsfwThemed.includes(x));
      _syncGrid('nsfwClothingGrid', v => S.nsfwClothing.includes(v));
    }
  }
  if(isArmorFull){
    const bad = S.nsfwClothing.filter(x=>['bikini','micro bikini','lingerie','pasties only'].includes(x));
    if(bad.length){
      cf(S.clothing, bad[0]);
      S.nsfwClothing = S.nsfwClothing.filter(x=>!['bikini','micro bikini','lingerie','pasties only'].includes(x));
      _syncGrid('nsfwClothingGrid', v => S.nsfwClothing.includes(v));
    }
  }
  if(isFormalFull){
    const bad = S.nsfwClothing.filter(x=>['bikini','micro bikini','lingerie','pasties only','micro skirt'].includes(x));
    if(bad.length){
      cf(S.clothing, bad[0]);
      S.nsfwClothing = S.nsfwClothing.filter(x=>!['bikini','micro bikini','lingerie','pasties only','micro skirt'].includes(x));
      _syncGrid('nsfwClothingGrid', v => S.nsfwClothing.includes(v));
    }
  }
  const _slot0 = charSlots&&charSlots[0]; 
  if(isSwimFull && _slot0&&_slot0.weapons&&_slot0.weapons.length){
    cf('لباس سباحة','أسلحة'); if(_slot0) _slot0.weapons=[];
    _syncGrid('weaponGrid', v => false);
  }

  // ─── 2. POSE LOGIC — silent swap (natural mutual exclusion) ─────
  const poseMutex=[
    ['sleeping','standing'],['sleeping','sitting'],['sleeping','crouching'],
    ['sleeping','kneeling'],['sleeping','dancing'],['sleeping','jumping'],
    ['sleeping','running'],['sleeping','floating'],['sleeping','stretching'],
    ['sleeping','fighting stance'],['sleeping','eating'],['sleeping','drinking'],
    ['sleeping','reading'],
    ['fighting stance','sitting'],['fighting stance','lying down'],
    ['fighting stance','eating'],['fighting stance','drinking'],['fighting stance','reading'],
    ['dancing','fighting stance'],['dancing','lying down'],['dancing','sitting'],
    ['dancing','eating'],['dancing','crouching'],
    ['running','sitting'],['running','lying down'],['running','eating'],['running','drinking'],
    ['eating','jumping'],['eating','fighting stance'],['eating','running'],
    ['drinking','jumping'],['drinking','fighting stance'],['drinking','running'],
    ['lying down','standing'],['lying down','jumping'],['lying down','running'],
    ['jumping','sitting'],['jumping','lying down'],['jumping','eating'],
  ];
  for(const [a,b] of poseMutex){
    if(S.poses.includes(a) && S.poses.includes(b)){
      sw();
      const ai=S.poses.indexOf(a), bi=S.poses.indexOf(b);
      S.poses.splice(Math.max(ai,bi),1);
      _syncGrid('poseGrid', v => S.poses.includes(v));
      break;
    }
  }

  const nsfwActivePoses=['on all fours','doggy style','missionary','cowgirl',
    'reverse cowgirl','oral','anal','gangbang'];
  const hasNsfwActive = S.nsfwPose.some(p=>nsfwActivePoses.includes(p));
  if(hasNsfwActive){
    const inc=['standing','running','jumping','fighting stance','dancing'];
    const removed=S.poses.filter(p=>inc.includes(p));
    if(removed.length){
      sw(); S.poses=S.poses.filter(p=>!inc.includes(p));
      _syncGrid('poseGrid', v => S.poses.includes(v));
    }
  }
  if(S.nsfwPose.includes('tied up')){
    const inc=['running','jumping','fighting stance','dancing'];
    const removed=S.poses.filter(p=>inc.includes(p));
    if(removed.length){
      sw(); S.poses=S.poses.filter(p=>!inc.includes(p));
      _syncGrid('poseGrid', v => S.poses.includes(v));
    }
  }
  if(S.nsfwPose.includes('spread legs')){
    const inc=['running','jumping'];
    const removed=S.poses.filter(p=>inc.includes(p));
    if(removed.length){
      sw(); S.poses=S.poses.filter(p=>!inc.includes(p));
      _syncGrid('poseGrid', v => S.poses.includes(v));
    }
  }

  // ─── 3. CAPS — silent trim ────────────────────────────────────────
  if(S.poses.length>2){     sw(); S.poses=S.poses.slice(0,2);           _syncGrid('poseGrid',        v=>S.poses.includes(v)); }
  if(S.weapons&&S.weapons.length>2){ sw(); S.weapons=S.weapons.slice(0,2); _syncGrid('weaponGrid', v=>S.weapons.includes(v)); }
  if(S.props&&S.props.length>3){ sw(); S.props=S.props.slice(0,3); _syncGrid('propsGrid', v=>S.props.includes(v)); }
  if(S.electronics&&S.electronics.length>2){ sw(); S.electronics=S.electronics.slice(0,2); _syncGrid('electronicsGrid', v=>S.electronics.includes(v)); }
  if(S.lights.length>3){    sw(); S.lights=S.lights.slice(0,3);         _syncGrid('lightGrid',       v=>S.lights.includes(v)); }
  if(S.effects.length>3){   sw(); S.effects=S.effects.slice(0,3);       _syncGrid('effectsGrid',     v=>S.effects.includes(v)); }

  // ─── 4. VISUAL/LIGHTING — silent swap ────────────────────────────
  if(S.colorGrade==='black & white' && S.glow && S.glow!=='no glow'){
    sw(); S.glow=null;
    _syncGrid('glowGrid', v => false);
  }
  if(S.shadow==='no shadows'){
    const dramatic=['rim light','backlight','neon light','moonlight','candlelight'];
    const removed=S.lights.filter(x=>dramatic.includes(x));
    if(removed.length){
      sw(); S.lights=S.lights.filter(x=>!dramatic.includes(x));
      _syncGrid('lightGrid', v => S.lights.includes(v));
    }
  }
  if(S.style==='chibi' && S.shot==='extreme closeup'){
    sw(); S.shot=null;
    _syncGrid('shotGrid', v => false);
  }

  // ─── 5. SLEEP — hard conflict → toast ────────────────────────────
  if(S.poses.includes('sleeping')){
    if(S.weapons&&S.weapons.length){ cf('نائم','أسلحة'); S.weapons=[]; _syncGrid('weaponGrid', v=>false); }
    if(S.electronics&&S.electronics.length){ cf('نائم','إلكترونيات'); S.electronics=[]; _syncGrid('electronicsGrid', v=>false); }
  }

  // ─── SHOW TOAST ──────────────────────────────────────────────────
  if(!_silent && conflicts.length>0){
    toastConflict(conflicts[0][0], conflicts[0][1]);
  }
}

/* Sync a specific grid's buttons to match state — called only when resolveConflicts changes something */
function _syncGrid(gid, stateFn){
  const g=document.getElementById(gid);
  if(!g) return;
  g.querySelectorAll('.ob').forEach(b=>{
    const en=(b.querySelector('span')||b).getAttribute('data-en')||b.textContent;
    b.classList.toggle('on', stateFn(en.toLowerCase()));
  });
}
// Keep old name as no-op so nothing else breaks
function _syncConflictUI(){}

function randomize(){
  const wasNsfw = S.nsfw;

  /* ── Save locked values before reset ── */
  const _locked = S.locked || {};
  const _savedLocked = {};
  BP_CELLS.forEach(function(c){
    if(!_locked[c.id]) return;
    _savedLocked[c.id] = {};
    c.keys.forEach(function(k){
      var v = S[k];
      _savedLocked[c.id][k] = Array.isArray(v) ? v.slice() : v;
    });
  });

  resetAll(true);
  if(wasNsfw){ S.nsfw=true; toggleNSFW(true); }
  S.locked = _locked; /* restore lock state after reset */

  // ── Characters — 80% single, 20% two ──
  let chosenChars;
  const charRoll = Math.random();
  if(charRoll < 0.80){
    // 80% single — female 80%, male 20%
    chosenChars = maybe(.80) ? ['female'] : ['male'];
  } else {
    // 20% two characters
    chosenChars = pick([['female','female'],['male','male'],['female','male']]);
  }
  chosenChars.forEach((g,i)=>{ if(i<2) S.characters[i]=g; });
  renderCharCards(); updateCharWarn();
  S.charCount = null;

  // ── Character Appearance ──
  if(maybe(.65)) S.skin       = pick(SKINS).val;
  if(maybe(.70)) S.hairColor1 = pick(HAIR_COLORS).id;
  if(maybe(.60)) S.eyeColor   = pick(EYE_COLORS).id;
  if(maybe(.70)){ var _hList=(D.hairstyle.shared||[]).concat(D.hairstyle.female||[]); S.hairstyle=pick(_hList).toLowerCase(); }
  if(maybe(.20)) S.eyeShape   = pick(D.eyeShape.lbl).toLowerCase();
  if(maybe(.65)) S.age        = pick(D.age.val.filter(v=>!['toddler','child','preteen'].includes(v)));
  if(maybe(.40)) S.body       = pick(D.body.val);

  // ── Outfit — Top+Bottom combo (60%) OR Full Outfit (40%) ──
  const _gender0   = S.characters ? (S.characters[0]||'female') : 'female';
  const sfwTops    = (_gender0==='male') ? (D.clothingTop.male||[]).concat(D.clothingTop.shared||[]) : (D.clothingTop.female||[]).concat(D.clothingTop.shared||[]);
  const sfwBottoms = (_gender0==='male') ? (D.clothingBottom.male||[]).concat(D.clothingBottom.shared||[]) : (D.clothingBottom.female||[]).concat(D.clothingBottom.shared||[]);
  const sfwFull    = CLOTHING_ITEMS.filter(it=>!it.nsfw&&(it.gender==='fm'||(it.gender==='f'&&_gender0!=='male')||(it.gender==='m'&&_gender0!=='female'))).map(it=>it.label);
  if(maybe(.60)){
    if(maybe(.75)) S.clothingTop    = pick(sfwTops).toLowerCase();
    if(maybe(.75)) S.clothingBottom = pick(sfwBottoms).toLowerCase();
    S.clothing = null;
  } else {
    S.clothing      = pick(sfwFull).toLowerCase();
    S.clothingTop   = null;
    S.clothingBottom= null;
  }
  if(maybe(.30)) S.shoes       = pick(D.shoes.lbl).toLowerCase();
  if(maybe(.30)) S.sockLength  = pick(D.sockLength.lbl.filter(x=>x!=='None')).toLowerCase();
  if(maybe(.20)) S.sockColor   = pick(D.sockColor.lbl).toLowerCase();
  if(maybe(.40)) S.clothingAcc = pickN(D.clothingAcc.lbl, Math.ceil(Math.random()*2)).map(x=>x.toLowerCase());
  if(maybe(.40)) S.faceAcc     = pickN(D.faceAcc.lbl, 1).map(x=>x.toLowerCase());

  // ── NSFW picks when active ──
  if(wasNsfw){
    if(maybe(.70)) S.nsfwBody      = pickN(D.nsfwBody.lbl, Math.ceil(Math.random()*2)).map(x=>x.toLowerCase());
    if(maybe(.75)) S.nsfwClothing  = pickN(D.nsfwClothing.lbl, Math.ceil(Math.random()*2)).map(x=>x.toLowerCase());
    if(maybe(.70)) S.nsfwPose      = pickN(D.nsfwPose.lbl, 1).map(x=>x.toLowerCase());
    if(maybe(.50)) S.nsfwFluid     = pickN(D.nsfwFluid.lbl.filter(x=>!['Feces (Scat)'].includes(x)), Math.ceil(Math.random()*2)).map(x=>x.toLowerCase());
    if(maybe(.60)) S.nsfwEnv       = pickN(D.nsfwEnv.lbl, 1).map(x=>x.toLowerCase());
    if(maybe(.40)) S.nsfwIndicator = pickN(D.nsfwIndicator.lbl, 1).map(x=>x.toLowerCase());
    if(maybe(.50)) S.nsfwShot      = pickN(D.nsfwShot.lbl, 1).map(x=>x.toLowerCase());
  }

  // ── Mood ──
  if(maybe(.80)) S.expression = pick(D.expression.lbl).toLowerCase();
  if(maybe(.80)) S.poses      = pickN(D.pose.lbl, 1).map(x=>x.toLowerCase());
  if(maybe(.40)) S.effects    = pickN(D.effects.lbl, Math.ceil(Math.random()*2)).map(x=>x.toLowerCase());
  if(maybe(.30)) S.liquids    = pickN(D.liquids.lbl, 1).map(x=>x.toLowerCase());

  // ── Tools ──
  if(maybe(.25)) S.weapons     = pickN(D.weapons.lbl, 1).map(x=>x.toLowerCase());
  if(maybe(.30)) S.props       = pickN(D.props.lbl, 1).map(x=>x.toLowerCase());
  if(maybe(.20)) S.electronics = pickN(D.electronics.lbl, 1).map(x=>x.toLowerCase());
  if(maybe(.20)) S.otherItems  = pickN(D.otherItems.lbl, 1).map(x=>x.toLowerCase());

  // ── Scene ──
  if(maybe(.80)) S.environment = pick(D.environment.lbl).toLowerCase();
  if(maybe(.90)) S.style       = pick(D.style.lbl).toLowerCase();
  if(maybe(.35)) S.era         = pick(D.era.lbl).toLowerCase();
  if(maybe(.45)) S.animeStudio = pick(D.animeStudio.lbl).toLowerCase();
  if(maybe(.85)) S.colorGrade  = pick(D.colorGrade.lbl).toLowerCase();

  // ── Quality — always 3-4 tags ──
  S.quality = pickN(D.quality.lbl, Math.floor(Math.random()*2)+3).map(x=>x.toLowerCase());

  // ── Lighting ──
  if(maybe(.60)) S.lights = pickN(D.light.lbl, Math.ceil(Math.random()*2)).map(x=>x.toLowerCase());
  if(maybe(.25)) S.glow   = pick(D.glow.lbl.filter(g=>g.toLowerCase()!=='no glow')).toLowerCase();
  if(maybe(.35)) S.shadow = pick(D.shadow.lbl.filter(x=>x!=='No Shadows')).toLowerCase();

  // ── Style extras ──
  if(maybe(.55)) S.stroke = pick(D.stroke.lbl).toLowerCase();
  if(maybe(.45)) S.smooth = pick(D.smooth.lbl.filter(x=>x!=='Normal')).toLowerCase();

  // ── Camera ──
  S.shot  = pick(D.shot.lbl).toLowerCase();
  S.angle = pick(D.angle.lbl).toLowerCase();
  S.look  = pick(D.look.lbl).toLowerCase();
  if(maybe(.40)) S.lens       = pick(D.lens.lbl).toLowerCase();
  if(maybe(.45)) S.lensEffect = pick(D.lensEffect.lbl.filter(x=>x!=='None')).toLowerCase();

  // ── Avoid ──
  S.negBody    = pickN(D.negBody.lbl,    Math.ceil(Math.random()*3)+2).map(x=>x.toLowerCase());
  S.negQuality = pickN(D.negQuality.lbl, Math.ceil(Math.random()*3)+2).map(x=>x.toLowerCase());

  // ── Contextual coherence ──────────────────────────────────────────
  const hasCombat   = (S.weapons&&S.weapons.length>0)||(charSlots&&charSlots.some(function(sl){return sl&&sl.weapons&&sl.weapons.length>0;}));
  const hasFighting = S.poses.some(p=>['fighting stance','running','jumping','crouching'].includes(p));

  // ── COMBAT / ACTION scene ──
  if(hasCombat || hasFighting){
    S.electronics = [];
    S.props = S.props.filter(p=>!['camera','smartphone','microphone','teddy bear','lollipop'].includes(p));
    S.expression = pick(['angry','confident','stoic','scared','shocked']);
    S.poses = S.poses.filter(p=>!['sleeping','sitting','reading','eating','drinking'].includes(p));
    if(!S.poses.length) S.poses = [pick(['fighting stance','running','jumping'])];
    // Combat clothing: armor/military preferred over formal
    if(S.clothing && ['evening gown','wedding dress','sleepwear / pajamas','swimsuit'].includes(S.clothing))
      S.clothing = pick(['fantasy armor','ninja outfit','military uniform','cyberpunk outfit']);
    // Dramatic lighting for combat
    if(!S.lights.length) S.lights = [pick(['rim light','backlight','neon light'])];
    if(!S.shadow) S.shadow = 'dramatic';
  }

  // ── CALM / RELAXED scene ──
  const calmPoses = ['sitting','sleeping','reading','eating','drinking','stretching','floating'];
  const hasCalmPose = S.poses.some(p=>calmPoses.includes(p));
  if(hasCalmPose && !hasCombat){
    S.weapons = [];
    if(['angry','stoic','scared','shocked'].includes(S.expression))
      S.expression = pick(['happy','gentle smile','shy','dreamy','tired','laughing','playful']);
    // Soft lighting for calm scenes
    if(!S.lights.length) S.lights = [pick(['natural light','soft diffused','candlelight'])];
  }

  // ── SLEEPING scene ──
  if(S.poses.includes('sleeping') || S.expression==='tired'){
    S.electronics = []; S.weapons = []; S.props = [];
    S.expression = pick(['tired','dreamy']);
    S.poses = ['sleeping'];
    if(S.clothing && !['sleepwear / pajamas','school uniform','sailor uniform'].includes(S.clothing))
      if(maybe(.6)) S.clothing = 'sleepwear / pajamas';
    if(!S.environment) S.environment = pick(['bedroom','castle']);
    S.lights = [pick(['candlelight','soft diffused','moonlight'])];
    S.shadow = 'soft shadows';
  }

  // ── DANCING scene ──
  if(S.poses.includes('dancing')){
    S.weapons = [];
    if(!['happy','laughing','playful','confident'].includes(S.expression))
      S.expression = pick(['happy','confident','playful']);
    if(maybe(.5)) S.clothing = pick(['idol outfit','gothic lolita','magical girl']);
    S.clothingTop = null; S.clothingBottom = null;
    if(!S.environment) S.environment = pick(['night city','castle','rooftop']);
  }

  // ── SWIMMING / BEACH scene ──
  if(S.environment==='beach' || S.clothing==='swimsuit' || S.clothing==='one-piece swimsuit'){
    S.electronics = S.electronics.filter(e=>!['laptop','gaming controller'].includes(e));
    S.weapons = [];
    if(!S.clothing || !['swimsuit','one-piece swimsuit'].includes(S.clothing)){
      S.clothing = pick(['swimsuit','one-piece swimsuit']);
      S.clothingTop = null; S.clothingBottom = null;
    }
    S.environment = 'beach';
    S.lights = [pick(['sunlight','golden hour','natural light'])];
    S.expression = pick(['happy','laughing','playful','confident']);
  }

  // ── SCHOOL scene ──
  if(S.environment==='school' || S.clothing==='school uniform' || S.clothing==='sailor uniform'){
    S.weapons = [];
    if(!S.clothing || !['school uniform','sailor uniform'].includes(S.clothing)){
      S.clothing = pick(['school uniform','sailor uniform']);
      S.clothingTop = null; S.clothingBottom = null;
    }
    S.environment = 'school';
    if(!['happy','gentle smile','shy','confident','laughing'].includes(S.expression))
      S.expression = pick(['happy','gentle smile','shy','confident']);
    if(maybe(.5)) S.props = [pick(['book','letter/envelope'])];
  }

  // ── FANTASY / MAGIC scene ──
  if(['fantasy realm','castle'].includes(S.environment) || ['magical girl','fantasy armor'].includes(S.clothing)){
    if(maybe(.6) && !S.weapons.length) S.weapons = [pick(['magic staff','magic wand','sword','katana'])];
    if(!S.effects.length) S.effects = pickN(['sparkles','magical aura','energy orbs','particles'],2);
    if(!S.glow) S.glow = pick(['ethereal glow','magical glow','soft glow']);
    if(!['magical girl','fantasy armor','gothic lolita'].includes(S.clothing)){
      if(maybe(.5)){ S.clothing = pick(['magical girl','fantasy armor']); S.clothingTop=null; S.clothingBottom=null; }
    }
  }

  // ── NIGHT CITY / CYBERPUNK scene ──
  if(S.environment==='night city' || S.clothing==='cyberpunk outfit'){
    if(!S.lights.length) S.lights = pickN(['neon light','rim light','backlight'],2);
    if(!S.colorGrade) S.colorGrade = pick(['neon palette','cyberpunk colors','cool tones']);
    if(maybe(.4) && !S.weapons.length) S.weapons = [pick(['pistol','rifle','katana','twin blades'])];
    if(S.clothing !== 'cyberpunk outfit' && maybe(.5)){ S.clothing='cyberpunk outfit'; S.clothingTop=null; S.clothingBottom=null; }
  }

  // ── FORMAL / ELEGANT scene ──
  const formalClothes=['formal suit','blazer & pants','little black dress','evening gown','wedding dress'];
  if(S.clothing && formalClothes.includes(S.clothing)){
    S.weapons = []; S.electronics = [];
    S.props = S.props.filter(p=>!['teddy bear','lollipop','gaming controller'].includes(p));
    if(!['gentle smile','confident','mysterious','stoic'].includes(S.expression))
      S.expression = pick(['gentle smile','confident','mysterious']);
    if(!S.environment) S.environment = pick(['castle','café','city street']);
    S.lights = [pick(['studio light','natural light','golden hour','candlelight'])];
  }

  // ── CAFE / READING scene ──
  if(S.environment==='café' || S.poses.includes('reading') || S.poses.includes('eating')){
    S.weapons = [];
    if(!S.props.length) S.props = [pick(['book','lollipop','umbrella'])];
    if(!['happy','gentle smile','shy','dreamy','tired'].includes(S.expression))
      S.expression = pick(['gentle smile','shy','dreamy']);
    if(!S.lights.length) S.lights = [pick(['natural light','soft diffused','candlelight'])];
  }

  // ── SPORTS / GYM scene ──
  const sportClothes=['tracksuit','sporty outfit'];
  const sportPoses=['running','jumping','crouching','stretching','fighting stance'];
  if((S.clothing && sportClothes.includes(S.clothing)) || S.poses.some(p=>sportPoses.includes(p))){
    S.weapons = [];
    if(S.clothing && !sportClothes.includes(S.clothing)){ S.clothing=pick(sportClothes); S.clothingTop=null; S.clothingBottom=null; }
    if(!['confident','stoic','tired','happy'].includes(S.expression))
      S.expression = pick(['confident','tired','happy']);
    if(!S.environment) S.environment = pick(['city street','rooftop','mountains']);
  }

  // ── OUTDOOR / NATURE scene ──
  if(['forest','mountains','desert','cherry blossom park'].includes(S.environment)){
    S.electronics = S.electronics.filter(e=>!['tv remote','smart watch'].includes(e));
    if(!S.lights.length) S.lights = [pick(['natural light','sunlight','golden hour'])];
    if(!S.colorGrade) S.colorGrade = pick(['earthy tones','warm tones','pastel palette']);
  }

  // ── SPACE / FANTASY ENVIRONMENT ──
  if(S.environment==='space'){
    S.weapons = S.weapons.filter(w=>!['fishing rod','broom','umbrella'].includes(w));
    if(!S.effects.length) S.effects = pickN(['sparkles','stars','energy orbs','particles'],2);
    if(!S.colorGrade) S.colorGrade = pick(['cool tones','monochrome blue','neon palette']);
  }

  // ── Fix conflicts after randomizing ──
  resolveConflicts(true);

  /* ── Restore locked values ── */
  Object.keys(_savedLocked).forEach(function(bpId){
    var vals = _savedLocked[bpId];
    Object.keys(vals).forEach(function(k){
      var v = vals[k];
      S[k] = Array.isArray(v) ? v.slice() : v;
    });
  });
  /* Re-apply lock UI (dims buttons, shows lock icon) */
  BP_CELLS.forEach(function(c){ if(_locked[c.id]) _updateLockUI(c.id); });

  reflectUI();
  if(typeof csReflectButtons === 'function') csReflectButtons();
  rebuild();
  toast('🎲 Randomized!');
}


/* ═══════════════════════════════════
   RESET
═══════════════════════════════════ */
function resetAll(silent=false){
  Object.keys(S).forEach(k=>{
    if(k==='favourites'||k==='characters') return;
    if(k==='negBody'||k==='negQuality'){S[k]=[];return;}
    if(k==='nsfw') S[k]=false;
    else if(Array.isArray(S[k])) S[k]=[];
    else S[k]=null;
  });
  S.extraPos=[];S.extraNeg=[];S.weights={};
  S.characters=[null,null];
  renderCharCards(); updateCharWarn();
  /* Reset UI */
  document.querySelectorAll('.ob,.cw,.cb').forEach(x=>x.classList.remove('on'));
  document.querySelectorAll('.cb').forEach(b=>b.style.borderColor='transparent');
  document.querySelectorAll('.color-dot').forEach(d=>d.remove());
  if(window._closeColorPicker) window._closeColorPicker();
  document.querySelectorAll('.sb').forEach((x,i)=>{x.classList.remove('on');x.style.borderColor=SKINS[i].bg;});
  document.getElementById('nsfwBtn').classList.remove('on');
  toggleNSFW(false);
  renderTagBoxes();
  /* Clear prompt boxes immediately to empty state */
  const pe=document.getElementById('promptText');
  pe.textContent=(typeof t==='function'?t('prompt_empty'):'Start selecting options on the left…');
  pe.className='ptxt empty';
  document.getElementById('posWC').textContent='';
  const ne=document.getElementById('negativeText');
  ne.textContent=(typeof t==='function'?t('neg_empty'):'Select avoids above, or use the tag box below…');
  ne.className='ptxt neg empty';
  document.getElementById('negWC').textContent='';
  updateBlueprint();
  updateCounter();
  if(!silent) toast('🔄 All cleared');
}

/* ═══════════════════════════════════
   TOAST
═══════════════════════════════════ */
function toast(msg, type=''){
  const t   = document.getElementById('toast');
  const ico = t.querySelector('i');
  document.getElementById('toastMsg').textContent = msg;
  t.className = 'toast' + (type ? ' '+type : '');
  if(ico){
    ico.className = type==='warn' ? 'fas fa-triangle-exclamation'
                  : type==='err'  ? 'fas fa-circle-xmark'
                  : 'fas fa-circle-check';
  }
  t.classList.add('show');
  clearTimeout(t._toastTimer);
  t._toastTimer = setTimeout(()=>t.classList.remove('show'), 4000);
}
// i18n labels for conflict notification
const _arNames={
  'sleeping':'نائم','fighting stance':'وضعية قتال','running':'يجري',
  'jumping':'يقفز','sitting':'جالس','lying down':'مستلقي',
  'eating':'يأكل','drinking':'يشرب','dancing':'يرقص',
  'standing':'واقف','crouching':'قرفصاء','kneeling':'راكع',
  'stretching':'يتمدد','floating':'يطفو','reading':'يقرأ',
  't-shirt':'تيشيرت','crop top':'كروب توب','hoodie':'هودي',
  'tank top':'تانك توب','tube top':'تيوب توب','halter top':'هالتر توب',
  'jeans':'جينز','skinny jeans':'جينز ضيق','wide-leg jeans':'جينز واسع',
  'ripped jeans':'جينز ممزق','shorts':'شورت','denim shorts':'شورت جينز',
  'mini shorts':'شورت قصير','leggings':'ليغنز','pleated skirt':'تنورة مكسرة',
  'mini skirt':'تنورة قصيرة','long skirt':'تنورة طويلة',
  'jogger pants':'جوغر','sweatpants':'بنطلون رياضي','cargo pants':'كارغو',
  'swimsuit':'لباس سباحة','one-piece swimsuit':'لباس سباحة كامل',
  'formal suit':'بدلة رسمية','blazer & pants':'بليزر وبنطلون',
  'little black dress':'فستان أسود','evening gown':'فستان سهرة',
  'wedding dress':'فستان زفاف','military uniform':'زي عسكري',
  'fantasy armor':'درع فانتازيا','ninja outfit':'زي نينجا',
  'swimwear':'سباحة','bikini':'بيكيني','micro bikini':'بيكيني صغير',
  'lingerie':'لانجري','pasties only':'باستي فقط','see-through':'شفاف',
  'wet clothes':'ملابس مبللة','micro skirt':'تنورة صغيرة','no bra':'بدون حمالة',
  'skirt lifted':'تنورة مرفوعة','torn clothes':'ملابس ممزقة',
  'weapons':'أسلحة','electronics':'إلكترونيات',
  'بيكيني / سباحة':'بيكيني / سباحة','لباس سباحة':'لباس سباحة',
  'black & white':'أبيض وأسود','no shadows':'بدون ظلال',
  'chibi':'شيبي','extreme closeup':'تقريب شديد',
  'tied up':'مقيد','spread legs':'فارد رجليه',
  'on all fours':'على أربعة',
};

const _conflictI18n = {
  en: {
    title: 'Selection Conflict',
    detail: (a,b) => `"${a}" doesn't work with "${b}"`,
    hint: 'Hover to pause · auto-dismiss in 4s',
    // English names stay as-is (just capitalize first letter)
    names: {}
  },
  ar: {
    title: 'تعارض في الاختيار',
    detail: (a,b) => `"${a}" لا يتوافق مع "${b}"`,
    hint: 'مرر المؤشر للإيقاف المؤقت',
    names: _arNames  // reuse the existing Arabic map
  },
  ja: {
    title: '競合する選択',
    detail: (a,b) => `「${a}」と「${b}」は同時に選べません`,
    hint: 'ホバーで一時停止',
    names: {}
  }
};

function _conflictName(name){
  const lang = (typeof _lang !== 'undefined') ? _lang : 'en';
  const i18n = _conflictI18n[lang] || _conflictI18n.en;
  const k = (name||'').toString().toLowerCase();
  // Try language-specific name map first
  if(i18n.names && i18n.names[k]) return i18n.names[k];
  // For Arabic, also check _arNames directly
  if(lang==='ar' && _arNames[k]) return _arNames[k];
  // English: capitalize first letter of each word
  return name.toString().replace(/\b\w/g,c=>c.toUpperCase());
}

let _conflictToastTimer = null;
let _conflictHovered = false;

function toastConflict(name1, name2){
  if(_conflictToastTimer) clearTimeout(_conflictToastTimer);

  const notif  = document.getElementById('conflictNotif');
  const title  = document.getElementById('conflictNotifTitle');
  const detail = document.getElementById('conflictNotifDetail');
  const hint   = document.getElementById('conflictNotifHint');
  if(!notif) return;

  const lang = (typeof _lang !== 'undefined') ? _lang : 'en';
  const i18n = _conflictI18n[lang] || _conflictI18n.en;

  const a = _conflictName(name1);
  const b = _conflictName(name2);

  title.textContent  = i18n.title;
  detail.textContent = i18n.detail(a, b);
  hint.textContent   = i18n.hint;

  notif.classList.add('show');
  _conflictHovered = false;

  function startDismiss(){
    _conflictToastTimer = setTimeout(()=>{
      if(!_conflictHovered){
        notif.classList.remove('show');
        _conflictToastTimer = null;
      }
    }, 4000);
  }

  startDismiss();

  // Hover: pause dismiss
  notif.onmouseenter = ()=>{
    _conflictHovered = true;
    if(_conflictToastTimer){ clearTimeout(_conflictToastTimer); _conflictToastTimer=null; }
  };
  notif.onmouseleave = ()=>{
    _conflictHovered = false;
    startDismiss();
  };
}

function _ar(name){
  if(!name) return '';
  const k=name.toString().toLowerCase();
  return _arNames[k] || name;
}


/* ═══════════════════════════════════
   RADAR / HUD BACKGROUND ANIMATION
═══════════════════════════════════ */
(function initRadar(){
  const canvas = document.getElementById('bpRadar');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize(){
    const bp = canvas.parentElement;
    const rect = bp.getBoundingClientRect();
    if(rect.width > 0 && rect.height > 0){
      canvas.width  = Math.round(rect.width);
      canvas.height = Math.round(rect.height);
      W = canvas.width;
      H = canvas.height;
      draw();
    }
  }

  function getAccent(){
    const s = getComputedStyle(document.body);
    return s.getPropertyValue('--p').trim() || '#6366f1';
  }

  function hexToRgb(hex){
    hex = hex.replace('#','').trim();
    if(hex.length===3) hex=hex.split('').map(x=>x+x).join('');
    const n=parseInt(hex,16);
    return [(n>>16)&255,(n>>8)&255,n&255];
  }

  function draw(){
    ctx.clearRect(0, 0, W, H);
    const accent = getAccent();
    let rgb;
    try{ rgb = hexToRgb(accent); } catch(e){ rgb=[99,102,241]; }
    const [r,g,b] = rgb;
    const col = (a) => `rgba(${r},${g},${b},${a})`;

    // Horizontal grid lines
    const hLines = 8;
    for(let i=1; i<hLines; i++){
      const y = H * i / hLines;
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y);
      ctx.strokeStyle = col(0.09); ctx.lineWidth = 0.6; ctx.stroke();
    }
    // Vertical grid lines
    const vLines = 10;
    for(let i=1; i<vLines; i++){
      const x = W * i / vLines;
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H);
      ctx.strokeStyle = col(0.06); ctx.lineWidth = 0.6; ctx.stroke();
    }
    // Corner tick marks
    const tick = 8;
    ctx.strokeStyle = col(0.22); ctx.lineWidth = 1;
    [[0,0,1,0,0,1],[W,0,-1,0,0,1],[0,H,1,0,0,-1],[W,H,-1,0,0,-1]].forEach(([x,y,dx1,dy1,dx2,dy2])=>{
      ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+dx1*tick,y+dy1*tick); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+dx2*tick,y+dy2*tick); ctx.stroke();
    });
    // Subtle center crosshair
    ctx.beginPath(); ctx.moveTo(W/2-6,H/2); ctx.lineTo(W/2+6,H/2);
    ctx.strokeStyle = col(0.18); ctx.lineWidth = 0.8; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W/2,H/2-6); ctx.lineTo(W/2,H/2+6); ctx.stroke();
  }

  resize();

  let resizeTimer;
  function debouncedResize(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }
  if(window.ResizeObserver){
    new ResizeObserver(debouncedResize).observe(canvas.parentElement);
  }
  window.addEventListener('resize', debouncedResize);
  // Redraw on theme change
  document.body.addEventListener('themechange', draw);
})();

/* ── START ── */
/* ── RESIZABLE PANEL DIVIDER ── */
(function(){
  const resizer = document.getElementById('layoutResizer');
  const rp = document.querySelector('.rp');
  if(!resizer || !rp) return;
  let startX, startW;
  resizer.addEventListener('mousedown', e=>{
    startX = e.clientX;
    startW = rp.offsetWidth;
    resizer.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    function onMove(e){
      const dx = e.clientX - startX;
      const newW = Math.min(700, Math.max(280, startW + dx));
      rp.style.width = newW + 'px';
    }
    function onUp(){
      resizer.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
})();

// ── WELCOME MODAL — always show on page load ──
(function(){
  const overlay = document.getElementById('wlcOverlay');
  const btn     = document.getElementById('wlcStart');
  if(!overlay) return;

  function closeWelcome(){
    overlay.style.transition = 'opacity .5s ease';
    overlay.style.opacity = '0';
    setTimeout(function(){
      overlay.classList.remove('open');
      overlay.style.opacity = '';
      overlay.style.transition = '';
    }, 500);
  }

  /* Only the button can close — no click-outside */
  if(btn) btn.addEventListener('click', closeWelcome);

  overlay.classList.add('open');
})();

/* ═══════════════════════════════════
   i18n — LANGUAGE SYSTEM (EN + AR)
═══════════════════════════════════ */
const LANG_FLAGS = {en:'EN', ar:'AR', ja:'JA'};

const UI = {
  en: {
    /* ── Header ── */
    random:'Random', nsfw:'NSFW', saved:'Saved', ms_characters:'Characters', ms_scene:'Scene',
    tab_style:'Style', tab_mood:'Mood', tab_scene:'Scene', tab_look:'Look', tab_outfit:'Outfit',
    tab_camera:'Camera', tab_quality:'Quality', tab_character:'Character',
    tab_tools:'Objects', tab_avoid:'Avoid', tab_layers:'Layers', tab_pose:'Pose',
    /* ── Prompts ── */
    positive_prompt:'Positive Prompt', negative_prompt:'Negative Prompt',
    copy_full:'Copy Full Prompt', copy_pos:'Positive', copy_neg:'Negative',
    save_fav:'Save Favourite', saved_library:'Saved Library', fav_empty:'No saved favourites yet',
    reset_all:'Reset All', footer_copy:'Anime Prompt Studio © 2026. All rights reserved.',
    clear:'Clear', clear_all:'Clear All',
    prompt_empty:'Start selecting options on the right…',
    neg_empty:'Select avoids above, or add in the box below…',
    placeholder_pos:'＋ Extra Positive Tags — Enter or Tab',
    placeholder_neg:'＋ Extra Negative Tags — Enter or Tab',
    tags:' tags',
    /* ── Blueprint & Strength ── */
    blueprint_ttl:'Character Blueprint',
    prompt_strength:'Prompt Strength',
    /* ── Info menus ── */
    color_themes:'Color Themes', help_info:'Help & Info',
    about:'About', features:'Features', tips:'Tips & Tricks',
    language:'Language',
    /* ── Misc ── */
    girls:'Girls', boys:'Boys', start_building:'Start Building',
    /* ── Section titles ── */
    sec_color_grading:'Color Grading', sec_anime_studio:'Anime Studio / Director Style',
    sec_art_style:'Art Style', sec_era:'Era', sec_line_style:'Line Style',
    sec_shadows:'Shadows', sec_glow:'Glow & Bloom', sec_skin_smooth:'Skin Smoothness',
    sec_quality_tags:'Quality Tags', sec_lighting:'Lighting',
    sec_characters:'Characters in Scene', sec_age:'Age Group',
    sec_skin_tone:'Skin Tone', sec_body:'Body Type', sec_hairstyle:'Hairstyle',
    sec_hair_color1:'Hair Color (Primary)', sec_hair_color2:'Hair Ombré (2nd Color)',
    sec_eye_shape:'Eye Shape', sec_eye_color:'Eye Color',
    sec_clothing:'Clothing Type', sec_clothing_acc:'Clothing Accessories',
    sec_sock_color:'Sock Color', sec_sock_length:'Sock Length',
    sec_footwear:'Footwear', sec_face_acc:'Face Accessories',
    sec_expression:'Expression', sec_pose:'Pose & Action',
    sec_effects:'Special Effects', sec_liquids:'Liquids & Materials',
    sec_weapons:'Weapons', sec_props:'Props & Objects',
    sec_electronics:'Electronics', sec_other:'Other Items',
    sec_environment:'Environment', sec_mood:'Mood / Atmosphere',
    sec_shot_range:'Shot Range', sec_camera_angle:'Camera Angle',
    sec_looking:'Looking Direction', sec_lens_type:'Lens Type',
    sec_lens_effect:'Lens Effect', sec_body_parts:'Body Parts Focus',
    sec_neg_prompt:'Negative Prompt', sec_tools:'Objects', sec_look:'Look', sec_outfit:'Outfit',
    /* ── Negative tab ── */
    what_to_avoid:'What To Avoid',
    avoid_desc:'Select anything you want excluded from the final image.',
    neg_body_anatomy:'Body & Anatomy', neg_image_quality:'Image Quality',
    body_parts_note:'Focus camera on specific body parts — NSFW mode only.',
    /* ── Blueprint labels ── */
    bp_char:'Character', bp_outfit:'Outfit',
    bp_mood:'Mood', bp_tools:'Tools', bp_style:'Style',
    bp_scene:'Scene', bp_camera:'Camera', bp_quality:'Quality',
    /* ── About modal ── */
    about_p1:'Anime Prompt Studio is a free, browser-based tool designed to help artists and enthusiasts craft detailed, high-quality prompts for AI image generation.',
    about_p2:'Built with a focus on anime and illustration styles, it gives you full control over character appearance, outfit, mood, scene, lighting, camera, and more — all in one place.',
    about_p3:'No account required. No data collected. Everything runs locally in your browser.',
    about_sig:'— Made with ✦ by MD.AI SYSTEMS',
    /* ── Features modal ── */
    feat_themes_t:'13 Color Themes', feat_themes_d:'Fully themed UI that adapts to your style',
    feat_char_t:'Full Character Builder', feat_char_d:'Hair, eyes, skin, body, outfit and more',
    feat_cloth_t:'50+ Clothing Options', feat_cloth_d:'Organized by category — tops, bottoms, full outfits',
    feat_studio_t:'Anime Studio Styles', feat_studio_d:'Ghibli, Ufotable, MAPPA, Makoto Shinkai and more',
    feat_color_t:'Color Grading', feat_color_d:'16 palette options from pastel to cyberpunk',
    feat_cam_t:'Camera Controls', feat_cam_d:'Shot range, angle, lens type and focus effects',
    feat_meter_t:'Prompt Strength Meter', feat_meter_d:'Detects conflicts, overloads and missing elements',
    feat_weight_t:'Tag Weight Slider', feat_weight_d:'Click any tag to boost or reduce its influence',
    feat_favs_t:'Favourites System', feat_favs_d:'Save and reload your best prompt combinations',
    feat_img_t:'Image Analyzer', feat_img_d:'Extract and reverse-engineer prompts from images',
    feat_rand_t:'Randomizer', feat_rand_d:'Generate a full random character in one click',
    feat_nsfw_t:'NSFW Mode', feat_nsfw_d:'Age-gated adult content section',
    /* ── Tips modal ── */
    tip1_t:'Start with Style', tip1_d:"Always pick an Art Style or Anime Studio first — it's the single most impactful tag for the final look.",
    tip2_t:'Use the Strength Meter', tip2_d:'Watch the Prompt Strength score. Conflicts (red) hurt quality the most — fix those before adding more tags.',
    tip3_t:'Lighting is Everything', tip3_d:'Add at least one lighting type. Rim Light + one ambient source gives dramatic, professional-looking results.',
    tip4_t:'Tag Weight Slider', tip4_d:'Click any tag in the prompt box to open the weight slider. Boost key elements like style or lighting above 1.3 for more impact.',
    tip5_t:'Quality Tags Matter', tip5_d:'Always include 3–4 quality tags: Masterpiece, Best Quality, Ultra Detailed. These are expected by most anime models.',
    tip6_t:'Less is More', tip6_d:'3–4 lighting types or 5+ effects will confuse the model. Keep each category focused — the Overload warning will alert you.',
    tip7_t:'Save Your Favourites', tip7_d:'Found a great combination? Hit the ♡ button to save it. You can load it any time from the Favourites menu.',
    tip8_t:'Use Extra Tags', tip8_d:'The Extra Positive Tags field is perfect for model-specific tokens or very niche details not covered by the builder.',
    /* ── Welcome modal ── */
    wlc_sub:'Your ultimate AI image prompt builder — free, fast, no account needed.',
    wlc_about_title:'About this project',
    wlc_about_body:'Anime Prompt Studio is a passion project built by <span class="wlc-brand">MD.AI SYSTEMS</span> — a team focused on making AI tools accessible and enjoyable for everyone. This tool runs entirely in your browser, stores nothing on any server, and is completely free.',
    wlc_footer:'No account needed · No data collected · Runs in your browser',
    wlc_feat1_t:'Full Character Builder', wlc_feat1_d:'Hair, eyes, skin, body, outfit & more',
    wlc_feat2_t:'5 Color Themes', wlc_feat2_d:'Fully themed UI that adapts to your style',
    wlc_feat3_t:'Prompt Strength Meter', wlc_feat3_d:'Detects conflicts & missing elements',
    wlc_feat4_t:'Favourites System', wlc_feat4_d:'Save & reload your best combinations',
    wlc_feat5_t:'One-Click Randomizer', wlc_feat5_d:'Generate a full character instantly',
    wlc_feat6_t:'Tag Weight Slider', wlc_feat6_d:"Fine-tune every tag's influence",
    /* ── Age Gate ── */
    ag_title:'Adults Only — 18+', ag_subtitle:'NSFW Content Warning',
    ag_body1:'This section contains mature content intended for adults only.',
    ag_body2:'By proceeding, you confirm the following:',
    ag_check1:'I am 18 years of age or older',
    ag_check2:'I take full responsibility for my use of this content',
    ag_check3:'Accessing this content is legal in my country or region',
    ag_check4:'I will not use generated prompts to create illegal content',
    ag_disclaimer:'The creator of this tool bears <strong>no responsibility</strong> for any misuse, harmful content generation, or violation of third-party platform terms. This tool generates text prompts only. You are solely responsible for how you use them.',
    ag_no:'No, I am Under 18', ag_yes:'Yes, I am 18 or Older',
    ag_footer:'⚠️ For artistic prompt generation purposes only',
  },
  ar: {
    /* ── Header ── */
    random:'عشوائي', nsfw:'محتوى ناضج', saved:'المحفوظات', ms_characters:'الشخصيات', ms_scene:'المشهد',
    tab_style:'الأسلوب', tab_mood:'المزاج', tab_scene:'المشهد', tab_look:'المظهر', tab_outfit:'الزي',
    tab_camera:'الكاميرا', tab_quality:'الجودة', tab_character:'الشخصية',
    tab_tools:'الأشياء', tab_avoid:'تجنب', tab_layers:'الطبقات', tab_pose:'الوضعية',
    /* ── Prompts ── */
    positive_prompt:'البرومبت الإيجابي', negative_prompt:'البرومبت السلبي',
    copy_full:'نسخ البرومبت كاملاً', copy_pos:'إيجابي', copy_neg:'سلبي',
    save_fav:'حفظ كمفضلة', saved_library:'المكتبة المحفوظة', fav_empty:'لا توجد مفضلات محفوظة بعد',
    reset_all:'إعادة تعيين الكل', footer_copy:'Anime Prompt Studio © 2026. جميع الحقوق محفوظة.',
    clear:'مسح', clear_all:'مسح الكل',
    prompt_empty:'ابدأ باختيار الخيارات…',
    neg_empty:'اختر ما تريد تجنبه أعلاه أو أضفه في الحقل أدناه…',
    placeholder_pos:'＋ تاغات إيجابية إضافية — Enter أو Tab',
    placeholder_neg:'＋ تاغات سلبية إضافية — Enter أو Tab',
    tags:' تاغ',
    /* ── Blueprint & Strength ── */
    blueprint_ttl:'مخطط الشخصية',
    prompt_strength:'قوة البرومبت',
    /* ── Info menus ── */
    color_themes:'ألوان الثيم', help_info:'مساعدة ومعلومات',
    about:'حول', features:'المميزات', tips:'نصائح وحيل',
    language:'اللغة',
    /* ── Misc ── */
    girls:'بنات', boys:'أولاد', start_building:'ابدأ الآن',
    /* ── Section titles ── */
    sec_color_grading:'تدرج الألوان', sec_anime_studio:'أسلوب الاستوديو الأنيمي',
    sec_art_style:'أسلوب الرسم', sec_era:'الحقبة الزمنية', sec_line_style:'أسلوب الخطوط',
    sec_shadows:'الظلال', sec_glow:'التوهج والإشراق', sec_skin_smooth:'نعومة البشرة',
    sec_quality_tags:'تاغات الجودة', sec_lighting:'الإضاءة',
    sec_characters:'الشخصيات في المشهد', sec_age:'الفئة العمرية',
    sec_skin_tone:'لون البشرة', sec_body:'نوع الجسم', sec_hairstyle:'تسريحة الشعر',
    sec_hair_color1:'لون الشعر الأساسي', sec_hair_color2:'لون الشعر الثانوي',
    sec_eye_shape:'شكل العينين', sec_eye_color:'لون العينين',
    sec_clothing:'نوع الملابس', sec_clothing_acc:'إكسسوارات الملابس',
    sec_sock_color:'لون الجوارب', sec_sock_length:'طول الجوارب',
    sec_footwear:'الأحذية', sec_face_acc:'إكسسوارات الوجه',
    sec_expression:'التعبير', sec_pose:'الوضعية والحركة',
    sec_effects:'التأثيرات الخاصة', sec_liquids:'السوائل والمواد',
    sec_weapons:'الأسلحة', sec_props:'الأدوات والأشياء',
    sec_electronics:'الإلكترونيات', sec_other:'أشياء أخرى',
    sec_environment:'البيئة والمكان', sec_mood:'المزاج والجو العام',
    sec_shot_range:'نطاق اللقطة', sec_camera_angle:'زاوية الكاميرا',
    sec_looking:'اتجاه النظر', sec_lens_type:'نوع العدسة',
    sec_lens_effect:'تأثير العدسة', sec_body_parts:'تركيز الكاميرا على الجسم',
    sec_neg_prompt:'البرومبت السلبي', sec_tools:'الأدوات', sec_look:'المظهر', sec_outfit:'الزي',
    /* ── Negative tab ── */
    what_to_avoid:'ما يجب تجنبه',
    avoid_desc:'اختر كل ما تريد استبعاده من الصورة النهائية.',
    neg_body_anatomy:'الجسم والتشريح', neg_image_quality:'جودة الصورة',
    body_parts_note:'تركيز الكاميرا على أجزاء محددة — يتطلب تفعيل وضع المحتوى الناضج.',
    /* ── Blueprint labels ── */
    bp_char:'الشخصية', bp_outfit:'الزي',
    bp_mood:'المزاج', bp_tools:'الأشياء', bp_style:'الأسلوب',
    bp_scene:'المشهد', bp_camera:'الكاميرا', bp_quality:'الجودة',
    /* ── About modal ── */
    about_p1:'Anime Prompt Studio أداة مجانية تعمل في المتصفح، مصممة لمساعدة الفنانين والمهتمين على صياغة برومبتات تفصيلية عالية الجودة لتوليد الصور بالذكاء الاصطناعي.',
    about_p2:'مبنية بتركيز على أسلوب الأنيمي والرسوم التوضيحية، تمنحك تحكماً كاملاً في مظهر الشخصية والزي والمزاج والمشهد والإضاءة والكاميرا — كل شيء في مكان واحد.',
    about_p3:'لا حساب مطلوب. لا بيانات تُجمع. كل شيء يعمل محلياً في متصفحك.',
    about_sig:'— صُنع بـ ✦ بواسطة MD.AI SYSTEMS',
    /* ── Features modal ── */
    feat_themes_t:'١٣ ثيم ملوّن', feat_themes_d:'واجهة مخصصة تتكيف مع أسلوبك',
    feat_char_t:'بناء شخصية كامل', feat_char_d:'شعر، عيون، بشرة، جسم، ملابس والمزيد',
    feat_cloth_t:'+٥٠ خيار ملابس', feat_cloth_d:'منظمة بالفئات — أعلى، أسفل، أطقم كاملة',
    feat_studio_t:'أساليب الاستوديو الأنيمي', feat_studio_d:'غيبلي، يوفوتابل، ماببا، ماكوتو شينكاي والمزيد',
    feat_color_t:'تدرج الألوان', feat_color_d:'١٦ خيار لوحة من الباستيل حتى السيبربانك',
    feat_cam_t:'التحكم بالكاميرا', feat_cam_d:'نطاق اللقطة، الزاوية، نوع العدسة وتأثيرات التركيز',
    feat_meter_t:'مقياس قوة البرومبت', feat_meter_d:'يكتشف التعارضات والزيادات والعناصر المفقودة',
    feat_weight_t:'شريط وزن التاغ', feat_weight_d:'انقر أي تاغ لرفع أو خفض تأثيره',
    feat_favs_t:'نظام المفضلة', feat_favs_d:'احفظ وأعد تحميل أفضل تركيباتك',
    feat_img_t:'محلل الصور', feat_img_d:'استخرج وعكس هندسة البرومبتات من الصور',
    feat_rand_t:'الاختيار العشوائي', feat_rand_d:'توليد شخصية كاملة بنقرة واحدة',
    feat_nsfw_t:'وضع المحتوى الناضج', feat_nsfw_d:'قسم محتوى للبالغين مع تحقق من العمر',
    /* ── Tips modal ── */
    tip1_t:'ابدأ بالأسلوب', tip1_d:'اختر دائماً أسلوب رسم أو استوديو أنيمي أولاً — فهو أكثر تاغ يؤثر على النتيجة النهائية.',
    tip2_t:'استخدم مقياس القوة', tip2_d:'راقب نقاط قوة البرومبت. التعارضات (الحمراء) تضر الجودة أكثر — عالجها قبل إضافة المزيد.',
    tip3_t:'الإضاءة كل شيء', tip3_d:'أضف نوع إضاءة واحداً على الأقل. Rim Light مع مصدر ضوء محيطي يعطي نتائج درامية واحترافية.',
    tip4_t:'شريط وزن التاغ', tip4_d:'انقر أي تاغ في صندوق البرومبت لفتح شريط الوزن. ارفع العناصر الرئيسية كالأسلوب والإضاءة فوق ١.٣ لتأثير أقوى.',
    tip5_t:'تاغات الجودة مهمة', tip5_d:'أضف دائماً ٣-٤ تاغات جودة: Masterpiece, Best Quality, Ultra Detailed — تتوقعها معظم نماذج الأنيمي.',
    tip6_t:'الأقل هو الأكثر', tip6_d:'٣-٤ أنواع إضاءة أو ٥+ تأثيرات ستربك النموذج. ركز كل فئة — تحذير Overload سيُنبهك.',
    tip7_t:'احفظ مفضلاتك', tip7_d:'وجدت تركيبة رائعة؟ اضغط زر ♡ لحفظها. يمكنك تحميلها في أي وقت من قائمة المفضلة.',
    tip8_t:'استخدم التاغات الإضافية', tip8_d:'حقل التاغات الإيجابية الإضافية مثالي للتوكنات الخاصة بالنموذج أو التفاصيل الدقيقة غير المغطاة.',
    /* ── Welcome modal ── */
    wlc_sub:'أفضل أداة لبناء برومبتات الذكاء الاصطناعي — مجانية، سريعة، لا حساب مطلوب.',
    wlc_about_title:'حول هذا المشروع',
    wlc_about_body:'Anime Prompt Studio مشروع بُني بشغف من قِبل <span class="wlc-brand">MD.AI SYSTEMS</span> — فريق يركز على جعل أدوات الذكاء الاصطناعي متاحة وممتعة للجميع. تعمل هذه الأداة بالكامل في متصفحك، ولا تحفظ أي شيء على أي خادم، وهي مجانية تماماً.',
    wlc_footer:'لا حساب مطلوب · لا بيانات تُجمع · يعمل في متصفحك',
    wlc_feat1_t:'بناء شخصية كامل', wlc_feat1_d:'شعر، عيون، بشرة، جسم، ملابس والمزيد',
    wlc_feat2_t:'٥ ثيمات ملونة', wlc_feat2_d:'واجهة مخصصة تتكيف مع أسلوبك',
    wlc_feat3_t:'مقياس قوة البرومبت', wlc_feat3_d:'يكتشف التعارضات والعناصر المفقودة',
    wlc_feat4_t:'نظام المفضلة', wlc_feat4_d:'احفظ وأعد تحميل أفضل تركيباتك',
    wlc_feat5_t:'اختيار عشوائي بنقرة', wlc_feat5_d:'ولّد شخصية كاملة فوراً',
    wlc_feat6_t:'شريط وزن التاغ', wlc_feat6_d:'ضبط دقيق لتأثير كل تاغ',
    /* ── Age Gate ── */
    ag_title:'للبالغين فقط — +١٨', ag_subtitle:'تحذير: محتوى ناضج',
    ag_body1:'يحتوي هذا القسم على محتوى ناضج مخصص للبالغين فقط.',
    ag_body2:'بالمتابعة، فأنت تؤكد التالي:',
    ag_check1:'عمري ١٨ عاماً أو أكثر',
    ag_check2:'أتحمل المسؤولية الكاملة عن استخدامي لهذا المحتوى',
    ag_check3:'الوصول لهذا المحتوى قانوني في بلدي أو منطقتي',
    ag_check4:'لن أستخدم البرومبتات المُنشأة لإنتاج محتوى غير قانوني',
    ag_disclaimer:'منشئ هذه الأداة <strong>لا يتحمل أي مسؤولية</strong> عن أي سوء استخدام أو إنتاج محتوى ضار أو انتهاك لشروط منصات خارجية. هذه الأداة تُنتج نصوص برومبت فقط. أنت وحدك المسؤول عن طريقة استخدامها.',
    ag_no:'لا، عمري أقل من ١٨', ag_yes:'نعم، عمري ١٨ أو أكثر',
    ag_footer:'⚠️ لأغراض توليد برومبتات فنية فقط',
  }
};

/* ── Option button labels (EN→AR) ── */
const OPT_AR = {
  // ── Characters ──
  '1 Girl':'فتاة واحدة','1 Man':'رجل واحد','2 Girls':'فتاتان','2 Men':'رجلان',
  '1 Girl + 1 Man':'فتاة ورجل','3+ Girls':'٣+ فتيات','3+ Men':'٣+ رجال','Mixed Group':'مجموعة مختلطة',
  // ── Age ──
  'Toddler (0–3)':'طفل رضيع','Child (4–8)':'طفل','Preteen (9–12)':'مراهق مبكر',
  'Teen (13–17)':'مراهق','Young Adult (18–25)':'شاب','Adult (26–35)':'بالغ',
  'Middle-Aged (36–50)':'متوسط العمر','Elderly (51+)':'كبير السن',
  // ── Gender ──
  'Feminine':'أنثوي','Masculine':'ذكوري','Androgynous':'محايد الجنس',
  // ── Body ──
  'Petite':'نحيلة','Slim':'رشيق','Athletic':'رياضي','Toned':'متناسق','Curvy':'ممتلئة',
  'Hourglass':'شكل الساعة الرملية','Muscular':'عضلي','Chubby':'ممتلئ قليلاً','Tall':'طويل','Short':'قصير',
  'Slim Waist':'خصر رفيع','Big Butt':'مؤخرة كبيرة','Thick Thighs':'فخذان سميكتان',
  'Curvy Hips':'وركان عريضان','Small Breasts':'صدر صغير','Large Breasts':'صدر كبير',
  'Huge Breasts':'صدر ضخم',
  // ── Skin ──
  'Fair/Pale':'فاتحة جداً','Light':'فاتحة','Medium':'متوسطة','Tan':'سمراء خفيفة','Deep':'سمراء','Dark':'داكنة',
  // ── Hairstyle ──
  'Long Straight':'مستقيم طويل','Long Wavy':'متموج طويل','Long Curly':'مجعد طويل',
  'Twin Tails':'ذيلان','High Ponytail':'ذيل حصان علوي','Side Ponytail':'ذيل حصان جانبي',
  'Braid':'ضفيرة','Double Braid':'ضفيرتان','Bun':'كعكة','Messy Bun':'كعكة مبعثرة',
  'Short Bob':'بوب قصير','Pixie Cut':'بيكسي','Hime Cut':'هيمي','Fluffy':'مفرفش',
  'Wet Hair':'شعر مبلل',
  // ── Hair Colors ──
  'White':'أبيض','Silver':'فضي','Blonde':'أشقر','Gold':'ذهبي','Peach':'خوخي',
  'Coral':'مرجاني','Red':'أحمر','Auburn':'بني أحمر','Pink':'وردي','Lavender':'خزامى',
  'Purple':'بنفسجي','Magenta':'فوشيا','Blue':'أزرق','Indigo':'نيلي','Cyan':'سماوي',
  'Teal':'أزرق مخضر','Mint':'نعناعي','Green':'أخضر','Brown':'بني','Black':'أسود',
  'Navy':'كحلي',
  // ── Eye Shape ──
  'Large Round':'كبير مستدير','Almond':'لوزي','Upturned':'مرفوع','Downturned':'منخفض',
  'Cat-like':'قط','Doe Eyes':'عيون غزالة','Hooded':'مغطى',
  // ── Eye Colors ──
  'Violet':'بنفسجي فاتح','Grey':'رمادي','Emerald':'زمردي','Sapphire':'ياقوتي','Rainbow':'قوس قزح',
  'Jade':'يشمي','Amber':'كهرماني',
  // ── Expression ──
  'Happy':'سعيد','Sad':'حزين','Angry':'غاضب','Shy':'خجول','Confident':'واثق',
  'Gentle Smile':'ابتسامة لطيفة','Laughing':'ضاحك','Crying':'باكي','Scared':'خائف',
  'Stoic':'هادئ','Seductive':'مغرٍ','Tired':'متعب','Surprised':'مندهش',
  'Playful':'مرح','Mysterious':'غامض','Dreamy':'حالم','Dramatic':'درامي',
  'Shocked':'مصدوم','Eyes Closed':'عيون مغلقة',
  // ── Clothing Separators ──
  '— Tops —':'— قمصان —','— Bottoms —':'— سراويل —','— Dresses —':'— فساتين —',
  '— Sets —':'— طقم —','— Uniforms —':'— زي —','— Specialty —':'— خاص —',
  // ── Clothing ──
  'T-Shirt':'تيشيرت','Crop Top':'توب قصير','Tied Crop Top':'توب مربوط',
  'Off-Shoulder Top':'توب كتف مكشوف','Tank Top':'قميص بلا أكمام',
  'Tube Top':'توب أنبوبي','Sleeveless Top':'بلا أكمام',
  'Long Sleeve Shirt':'قميص طويل الأكمام','Button-Up Shirt':'قميص بأزرار',
  'Oversized Shirt':'قميص كبير','Graphic Tee':'تيشيرت مطبوع',
  'Polo Shirt':'بولو','Ribbed Top':'توب مضلع','Halter Top':'هالتر توب',
  'Hoodie':'هودي','Zip-Up Hoodie':'هودي بسحاب','Oversized Hoodie':'هودي كبير',
  'Sweatshirt':'سويت شيرت',
  'Jeans':'جينز','Skinny Jeans':'جينز ضيق','Wide-Leg Jeans':'جينز واسع',
  'Ripped Jeans':'جينز ممزق','Shorts':'شورت','Denim Shorts':'شورت جينز',
  'Mini Shorts':'شورت قصير','High-Waist Shorts':'شورت خصر عالي',
  'Jogger Pants':'جوغر','Sweatpants':'سويت بانت','Cargo Pants':'كارغو',
  'Leggings':'ليغنز','Pleated Skirt':'تنورة مكسرات','Mini Skirt':'تنورة قصيرة',
  'Plaid Skirt':'تنورة مربعات','Long Skirt':'تنورة طويلة','Denim Skirt':'تنورة جينز',
  'Micro Skirt':'تنورة مايكرو','Skirt Lifted':'تنورة مرفوعة',
  'Little Black Dress':'فستان أسود صغير','Evening Gown':'فستان سهرة',
  'Wedding Dress':'فستان زفاف',
  'School Uniform':'زي مدرسي','Sailor Uniform':'زي بحري','Tracksuit':'بدلة رياضية',
  'Casual Streetwear':'ملابس كاجوال','Sporty Outfit':'زي رياضي',
  'Sleepwear / Pajamas':'بيجاما','Swimsuit':'مايوه','One-Piece Swimsuit':'مايوه كامل',
  'Swimwear':'ملابس سباحة','Bikini':'بيكيني','Micro Bikini':'بيكيني مايكرو',
  'Formal Suit':'بدلة رسمية','Blazer & Pants':'بليزر وبنطال',
  'Magical Girl':'فتاة سحرية','Maid Outfit':'زي خادمة','Gothic Lolita':'غوثيك لوليتا',
  'Kimono':'كيمونو','Yukata':'يوكاتا','Fantasy Armor':'درع خيالي',
  'Ninja Outfit':'زي نينجا','Military Uniform':'زي عسكري',
  'Lingerie':'لانجري','See-through':'شفاف','Sheer':'شفاف خفيف',
  'Naked':'عارية','Nude':'عارية','Topless':'بلا توب','No Bra':'بلا حمالة',
  'Panties Visible':'ملابس داخلية ظاهرة',
  // ── Accessories ──
  'Ribbon Bow':'ربطة شريط','Belt':'حزام','Choker':'طوق','Backpack':'حقيبة ظهر',
  'Suspenders':'حمالات','Gloves':'قفازات','Scarf':'وشاح','Cape':'رداء',
  'Apron':'مريلة','Tie':'ربطة عنق',
  'Glasses':'نظارات','Round Glasses':'نظارات دائرية','Sunglasses':'نظارات شمسية',
  'Flower Crown':'تاج ورد','Headband':'عصابة رأس','Headphones':'سماعات',
  'Hair Clip':'مشبك شعر','Eye Patch':'رقعة عين','Mask':'قناع','Veil':'طرحة',
  'Halo':'هالة','Horns':'قرون','Crown':'تاج','Animal Ears':'آذان حيوان',
  'Collar & Leash':'طوق وسلسلة','Handcuffs/BDSM':'قيود',
  // ── Footwear ──
  'Sneakers':'أحذية رياضية','Boots':'بوت','Heels':'كعب عالٍ','Sandals':'صندل',
  'Loafers':'لوفر','Barefoot':'حافي القدمين','Platform':'بلاتفورم',
  'School Shoes':'حذاء مدرسي',
  // ── Sock ──
  'Thigh-High':'حتى الفخذ','Over-Knee':'فوق الركبة','Knee-High':'حتى الركبة','Ankle':'كاحل',
  // ── Sock Color ──
  'Striped':'مخطط',
  // ── Pose ──
  'Standing':'وقوف','Sitting':'جلوس','Kneeling':'ركوع','Crouching':'انحناء',
  'Lying Down':'استلقاء','Running':'ركض','Jumping':'قفز','Dancing':'رقص',
  'Fighting Stance':'وضعية قتال','Floating':'طفو','Stretching':'تمدد',
  'Reading':'قراءة','Eating':'أكل','Drinking':'شرب','Sleeping':'نوم',
  'In Bed':'في السرير','Between Legs':'بين الأرجل','Spread Legs':'أرجل مفتوحة',
  'On All Fours':'على الأربع','Self-Touching':'تلمس ذاتي',
  'Fingering':'إيروتيك','Tied Up':'مربوط',
  // ── Effects ──
  'Fire':'نار','Lightning':'برق','Electricity':'كهرباء','Ice Crystals':'بلورات ثلج',
  'Water Splash':'رشة ماء','Smoke':'دخان','Sparkles':'لمعان','Particles':'جسيمات',
  'Energy Orbs':'كرات طاقة','Magical Aura':'هالة سحرية','Magical Glow':'توهج سحري',
  'Stars':'نجوم','Rose':'وردة','Cherry Blossoms':'أزهار الكرز','Dew Drops':'قطرات ندى',
  'Glistening':'لامع','Ethereal Glow':'توهج أثيري','Rain-Soaked':'مبلل بالمطر',
  'Wet/Soaked':'مبلل','Sweat':'عرق','Sweat Droplets':'قطرات عرق',
  'Tears':'دموع','Body Oil':'زيت جسم','Dripping':'يقطر',
  'Erect Nipples':'حلمات منتصبة','Cum':'سائل منوي','Cum on Face':'سائل على الوجه',
  'Cum on Body':'سائل على الجسم','Cum Inside':'سائل داخلي',
  'Milk/Lactation':'حليب','Urine/Squirt':'سائل','Vaginal Fluid':'إفراز أنثوي',
  'Anal Fluid':'إفراز شرجي','Feces (Scat)':'برازي','Semen Stain':'بقعة','Fecal Stain':'بقعة',
  'Urine Stain':'بقعة',
  // ── Scene/Environment ──
  'Forest':'غابة','Beach':'شاطئ','Desert':'صحراء','Mountains':'جبال',
  'Space':'الفضاء','City Street':'شارع المدينة','Night City':'مدينة ليلية',
  'Rooftop':'السطح','School':'مدرسة','Bedroom':'غرفة النوم','Bathroom':'حمام',
  'Shower':'دش','Onsen':'حمام ياباني','Onsen Bath':'حوض ياباني',
  'Hotel Room':'غرفة فندق','Locker Room':'غرفة تغيير','Sex Dungeon':'قبو',
  'Castle':'قلعة','Fantasy Realm':'عالم خيالي','Cherry Blossom Park':'حديقة أزهار',
  'Public Outdoor':'خارجي عام','Adult Club':'نادي',
  // ── Mood ──
  'Dramatic':'درامي','Dreamy':'حالم','Mysterious':'غامض','Playful':'مرح',
  'Professional':'احترافي','Cinematic':'سينمائي','Normal':'طبيعي','None':'لا شيء',
  // ── Art Style ──
  'Anime':'أنيمي','Manga / Ink':'مانجا / حبر','Digital Painting':'رسم رقمي',
  'Oil Painting':'ألوان زيتية','Watercolor':'ألوان مائية','Sketch / Pencil':'رسم بالقلم',
  'Pixel Art':'فن بيكسل','16-bit Pixel Art':'بيكسل 16 بت','32-bit Pixel Art':'بيكسل 32 بت',
  'Sprite Art':'فن الـ Sprite','Voxel Art':'فن فوكسل','Vector Art':'رسم متجهي',
  'Chibi':'شيبي','Cel Shading':'تظليل خلية','Concept Art':'رسم مفاهيمي',
  'Fantasy Art':'فن خيالي','Painterly':'لوحاتي','Flat Design':'تصميم مسطح',
  'Low Poly':'بوليغون منخفض','Textured':'نسيج','Dark Ink':'حبر داكن',
  // ── Era ──
  '1980s':'الثمانينيات','1990s':'التسعينيات','2000s':'الألفية','2010s':'العقد الثاني',
  '2020s':'العقد الثالث','Retro 90s Anime':'أنيمي تسعينيات',
  // ── Line Style ──
  'Bold Lines':'خطوط سميكة','Medium Lines':'خطوط متوسطة','Thin Lines':'خطوط رفيعة',
  'Thick Lines':'خطوط سميكة جداً','No Outline':'بلا خطوط','Soft Edges':'حواف ناعمة',
  // ── Shadows ──
  'Hard Shadows':'ظلال قوية','Soft Shadows':'ظلال ناعمة','Medium Shadows':'ظلال متوسطة',
  'No Shadows':'بلا ظلال',
  // ── Glow ──
  'Soft Glow':'توهج ناعم','Golden Glow':'توهج ذهبي','Magical Glow':'توهج سحري',
  'Warm Glow':'توهج دافئ','No Glow':'بلا توهج',
  // ── Skin Smoothness ──
  'Smooth Skin':'بشرة ناعمة','Silky':'حريري',
  // ── Quality ──
  'Masterpiece':'تحفة فنية','Best Quality':'أفضل جودة','Ultra Detailed':'تفاصيل فائقة',
  'High Resolution':'دقة عالية','4K':'4K','8K':'8K','Award-Winning':'حائز على جوائز',
  // ── Lighting ──
  'Natural Light':'ضوء طبيعي','Sunlight':'ضوء الشمس','Golden Hour':'الساعة الذهبية',
  'Moonlight':'ضوء القمر','Candlelight':'ضوء الشمعة','Neon Light':'ضوء نيون',
  'Studio Light':'ضوء الاستوديو','Backlight':'إضاءة خلفية','Rim Light':'إضاءة حافة',
  'Soft Diffused':'ناعم منتشر',
  // ── Color Grading ──
  'Warm Tones':'دافئة','Cool Tones':'باردة','Pastel Palette':'باستيل',
  'Neon Palette':'نيون','HDR Colors':'HDR','Duotone':'ثنائي اللون',
  'Vibrant / Saturated':'مشبع','Monochrome Red':'أحمر أحادي',
  'Monochrome Blue':'أزرق أحادي','Cyberpunk Colors':'سيبربانك',
  'Golden Hour Tones':'ذهبي','Earthy Tones':'ترابي',
  'Black & White':'أبيض وأسود','Vintage / Faded':'عتيق',
  'Muted / Desaturated':'مخفف','Flat Colors':'ألوان مسطحة',
  // ── Anime Studio ──
  'Studio Ghibli style':'ستوديو جيبلي','Makoto Shinkai style':'ماكوتو شينكاي',
  'Kyoto Animation style':'كيوتو أنيميشن','MAPPA style':'ماپا',
  'Ufotable style':'أوفوتيبل','Gainax style':'غاينكس','Madhouse style':'مادهاوس',
  'Trigger style':'تريغر','Sailor Moon style':'سيلور مون','Evangelion style':'إيفانغيليون',
  'Attack on Titan style':'تيتان','Naruto style':'ناروتو','Dragon Ball style':'دراغون بول',
  'Demon Slayer style':'قاتل الشياطين','Your Name style':'اسمك','Akira style':'أكيرا',
  // ── Shot Range ──
  'Extreme Closeup':'تقريب أقصى','Face Closeup':'تقريب الوجه','Headshot':'لقطة الرأس',
  'Bust Shot':'نصف الجسم','Waist Up':'من الخصر','Full Body':'جسم كامل',
  'Full Environment':'البيئة الكاملة','Macro':'ماكرو',
  'Nude Macro':'ماكرو عارية',
  // ── Camera Angle ──
  'Eye Level':'مستوى العين','Low Angle':'زاوية منخفضة','High Angle':'زاوية عالية',
  'Focus Face':'تركيز الوجه','Focus Body':'تركيز الجسم','Standard':'قياسي',
  'Crotch Shot':'لقطة سفلية','Panty Shot':'لقطة داخلية','Upskirt':'لقطة من أسفل',
  'Closeup Breasts':'تقريب صدر','Closeup Nipples':'تقريب حلمات',
  'Closeup Vagina':'تقريب أنثوي','Closeup Anus':'تقريب شرجي',
  'Closeup Penis':'تقريب ذكوري',
  // ── Looking Direction ──
  'At Viewer':'نحو المشاهد','Away':'بعيداً','Up':'للأعلى','Down':'للأسفل','To the Side':'للجانب',
  // ── Lens ──
  'Wide Angle':'زاوية واسعة','Telephoto':'تيليفوتو',
  '85mm Portrait':'٨٥مم بورتريه','Fisheye':'عين السمكة',
  'Soft Focus':'تركيز ناعم','Sharp Focus':'تركيز حاد','Depth of Field':'عمق الحقل',
  'Bokeh / Blurred BG':'بوكيه','Digital Camera':'كاميرا رقمية','Drone':'طائرة مسيّرة',
  // ── Weapons ──
  'Sword':'سيف','Katana':'كاتانا','Twin Blades':'شفرتان','Dagger':'خنجر','Axe':'فأس',
  'Spear':'رمح','Bow & Arrow':'قوس وسهم','Crossbow':'قاطع عرضي','Rifle':'بندقية',
  'Pistol':'مسدس','Sniper':'قناص','Machine Gun':'رشاش','Shotgun':'بندقية صيد',
  'Bazooka':'بازوكا','Grenade':'قنبلة يدوية','Magic Staff':'عصا سحرية',
  'Magic Wand':'عصا سحرية صغيرة','Scepter':'صولجان','Scythe':'منجل',
  'Shield':'درع','Rope':'حبل','Bomb':'قنبلة','Hammer':'مطرقة','Twin Blades':'شفرتان',
  // ── Props ──
  'Book':'كتاب','Scroll':'لفافة','Map':'خريطة','Compass':'بوصلة','Lantern':'فانوس',
  'Candle':'شمعة','Mirror':'مرآة','Potion Bottle':'زجاجة جرعة','Treasure Chest':'صندوق كنز',
  'Rose':'وردة','Lollipop':'مصاصة','Teddy Bear':'دمية دب','Fan':'مروحة',
  'Umbrella':'مظلة','Briefcase':'حقيبة عمل','Broom':'مكنسة',
  'Letter/Envelope':'رسالة / مظروف','Flag':'علم','Guitar':'غيتار',
  'Violin':'كمان','Microphone':'ميكروفون','Fishing Rod':'قضيب صيد',
  'Diaper (Baby)':'حفاضة','Female Diaper':'حفاضة أنثوية','Sanitary Pad':'فوطة صحية',
  'Sex Toy':'ألعاب','Dildo':'لعبة','Vibrator':'مدلك','Anal Plug':'سدادة',
  // ── Electronics ──
  'Smartphone':'هاتف ذكي','Laptop':'حاسوب محمول','Tablet':'لوح إلكتروني',
  'Gaming Controller':'يد تحكم','Smart Watch':'ساعة ذكية',
  'VR Headset':'نظارة VR','Camera':'كاميرا','TV Remote':'ريموت',
  // ── Negative Prompt ──
  'Bad Anatomy':'تشريح سيء','Deformed Hands':'أيدي مشوهة','Mutated Fingers':'أصابع طافرة',
  'Extra Fingers':'أصابع زائدة','Missing Fingers':'أصابع مفقودة','Extra Limbs':'أطراف زائدة',
  'Floating Limbs':'أطراف طائرة','Deformed Legs':'أرجل مشوهة','Missing Legs':'أرجل مفقودة',
  'Extra Legs':'أرجل زائدة','Bad Feet':'أقدام سيئة','Disconnected Body':'جسم منفصل',
  'Ugly Face':'وجه قبيح','Weird Proportions':'نسب غريبة','Duplicate Character':'شخصية مكررة',
  'Blurry':'ضبابي','Low Quality':'جودة منخفضة','JPEG Artifacts':'تشوهات JPEG',
  'Artifacts':'تشوهات','Noise/Grain':'ضوضاء / حبوب','Overexposed':'تعرض زائد',
  'Underexposed':'تعرض ناقص','Watermark/Text':'علامة مائية','Cropped':'مقطوع',
  'Out of Frame':'خارج الإطار','Washed Out':'باهت',
  'Missing Limbs':'أطراف مفقودة',
  // ── Clothing ──
  'Café':'مقهى','Medical Kit':'حقيبة طبية','Porcelain':'بشرة كالخزف',
  'Bare Legs':'أرجل مكشوفة','Bare Midriff':'بطن مكشوف',
  'Cleavage':'فتحة الصدر','Torn Clothes':'ملابس ممزقة',
  'Unbuttoned':'مفكوك الأزرار','Wet Clothes':'ملابس مبللة',
  // ── NSFW Body ──
  'Breasts':'نهود','Nipples':'حلمات','Visible Areolas':'هالات ظاهرة',
  'Pasties Only':'لاصقات فقط',
  'Penis (Male)':'عضو ذكري','Vagina':'عضو أنثوي','Anus':'فتحة خلفية',
  'Female Discharge':'إفرازات أنثوية',
  // ── NSFW Poses ──
  'Missionary':'وضعية ميشنري','Cowgirl':'وضعية كاوغيرل',
  'Reverse Cowgirl':'وضعية كاوغيرل معكوسة','Doggy Style':'وضعية دوغي',
  'Oral':'فموي','Anal':'شرجي','Gangbang':'جماعي','Glory Hole':'ثقب',
  // ── Clothing Condition (missing) ──
  'Wet':'مبلل','Soaked':'منقوع','Torn':'ممزق','Dirty':'متسخ','Muddy':'موحل',
  'Blood-Stained':'ملطخ بالدم','Burnt':'محروق','Wrinkled':'مجعد','Disheveled':'فوضوي',
  // ── NSFW Clothing (missing) ──
  'Bunny Suit':'بدلة الأرنب','Nurse Outfit':'زي الممرضة','French Maid':'خادمة فرنسية',
  'Cheerleader':'مشجعة','Police Costume':'زي الشرطة',
  'Fishnet Top':'قميص شبكي','Fishnet Stockings':'جوارب شبكية',
  'Cutout Top':'قميص مقطوع','Micro Crop Top':'توب قصير جداً','Exposed Midriff Top':'توب مكشوف البطن',
  'Open Back Top':'توب مفتوح الظهر','Sheer Top':'توب شفاف','Strapless Bra Top':'بنطلون بلا حمالات',
  'Tiny Top':'توب صغير جداً','Garter Belt':'حزام الجارتير',
  'Thong':'ثونغ','Micro Miniskirt':'تنورة مايكرو','Slit Skirt':'تنورة بشق',
  'Booty Shorts':'شورت قصير','Lace Shorts':'شورت دانتيل','Crotchless Shorts':'شورت مفتوح',
  'Plaid':'مربعات',
  // ── Colors (missing) ──
  'Beige':'بيج','Gray':'رمادي','Light Gray':'رمادي فاتح','Dark Gray':'رمادي غامق',
  'Crimson':'قرمزي','Maroon':'كستنائي','Orange':'برتقالي','Yellow':'أصفر',
  'Olive':'زيتوني','Hot Pink':'وردي فاتح','Sky Blue':'أزرق سماوي','Light Blue':'أزرق فاتح',
  'Dark Green':'أخضر غامق','Dark Brown':'بني غامق','Sandy':'رملي',
  // ── NSFW (missing from AR) ──
  'See-through':'شفاف','No Bra':'بلا حمالة','Swimwear':'ملابس سباحة','Micro Bikini':'بيكيني صغير',
  'Micro Skirt':'تنورة مايكرو','Panties Visible':'ملابس داخلية ظاهرة','Panty Shot':'لقطة داخلية',
  'Skirt Lifted':'تنورة مرفوعة','Upskirt':'تحت التنورة','Topless':'بلا قميص',
  'Naked':'عارية','Nude':'عارٍ','Nude Macro':'تصوير كامل','Lingerie':'لانجري',
  'Collar & Leash':'طوق وقيد','Tied Up':'مقيد','Handcuffs/BDSM':'أصفاد',
  'Spread Legs':'أرجل مفتوحة','On All Fours':'على الأربع','Self-Touching':'لمس الذات',
  'Fingering':'إصبع','Crotch Shot':'لقطة منتصف','Between Legs':'بين الأرجل',
  'Erect Nipples':'حلمات منتصبة',
  'Cum':'سائل','Cum on Face':'على الوجه','Cum on Body':'على الجسم','Cum Inside':'داخلي',
  'Urine/Squirt':'بول','Vaginal Fluid':'سائل أنثوي','Anal Fluid':'سائل خلفي',
  'Milk/Lactation':'حليب','Semen Stain':'بقعة','Urine Stain':'بقعة بول','Fecal Stain':'بقعة برازية',
  'Feces (Scat)':'برازي',
  'Shower':'دوش','Bathroom':'حمام','Onsen Bath':'حمام أونسن','Hotel Room':'غرفة فندقية',
  'Locker Room':'غرفة تبديل','In Bed':'في السرير','Sex Dungeon':'غرفة مظلمة',
  'Public Outdoor':'خارجي عام','Adult Club':'نادي بالغين',
  'Closeup Breasts':'تكبير الصدر','Closeup Nipples':'تكبير الحلمات',
  'Closeup Vagina':'تكبير أنثوي','Closeup Anus':'تكبير خلفي','Closeup Penis':'تكبير ذكوري',
  'Naked':'عارية','Nude Macro':'تصوير كامل',
  // ── Other missing ──
  'None':'لا شيء','Chibi':'تشيبي',
  'Slim Waist':'خصر رفيع','Big Butt':'مؤخرة كبيرة','Thick Thighs':'فخذان سميكتان',
  'Curvy Hips':'وركان عريضان','Small Breasts':'صدر صغير','Large Breasts':'صدر كبير',
  'Huge Breasts':'صدر ضخم',
  'Hammer':'مطرقة','Fishing Rod':'قضيب صيد',
  "Bird's Eye":'منظر علوي',
  // ── Camera Angles ──
  "Bird's Eye":'عين الطير','Side Profile':'بروفايل جانبي','Over Shoulder':'فوق الكتف',
  // ── New Tabs ──
  'Layers':'الطبقات','Pose':'الوضعية','Socks':'الجوارب','Action':'الحركة',
  // ── New Sections ──
  'Clothing Condition':'حالة الملابس','Clothing Accessories':'إكسسوارات الملابس',
  'Socks & Shoes':'الجوارب والأحذية','Sock Length':'طول الجارب','Footwear':'الأحذية',
  'Activity & Action':'النشاط والحركة','Pose & Action':'الوضعية والحركة',
  'NSFW Objects':'أشياء ناضجة','NSFW Stains':'بقع ناضجة',
  // ── Clothing Condition items ──
  'Torn':'ممزق','Ripped':'مقطوع','Burned':'محروق','Battle-Damaged':'تالف بالمعركة',
  'Dirty':'متسخ','Muddy':'موحل','Sandy':'رملي','Blood-Stained':'ملطخ بالدم','Paint-Splattered':'ملطخ بالطلاء',
  'Wet':'مبلل','Soaked':'منقوع','Rain-Drenched':'مبلل بالمطر','Sweat-Drenched':'مبلل بالعرق',
  'Wrinkled':'مجعد','Disheveled':'فوضوي','Loosened':'مرخي','Partially Removed':'مزال جزئياً',
  // ── NSFW Condition ──
  'Semen-Stained':'ملطخ بالسائل المنوي','Cum-Covered':'مغطى بالسائل','Cum Dripping':'تقطر منه السائل',
  'Urine-Stained':'ملطخ بالبول','Fecal-Stained':'ملطخ بالبراز',
  'Feces-Covered':'مغطى بالبراز','Defecating':'خروج براز',
  'Sweat-Soaked':'مبلل بالعرق','Milk-Stained':'ملطخ بالحليب',
  // ── CLOTHING_ITEMS new ──
  'Shirt Dress':'فستان قميص','Wrap Dress':'فستان ملفوف','Punk Outfit':'زي بانك',
  'Tank Top & Shorts':'قميص وشورت','Corporate Blazer Set':'بليزر رسمي',
  'Bank Teller Uniform':'زي موظف بنك','Postal Worker Uniform':'زي موظف بريد',
  'Hotel Staff Uniform':'زي موظف فندق','Cocktail Dress':'فستان كوكتيل',
  'Prom Dress':'فستان حفلة','Bridesmaid Dress':'فستان وصيفة',
  'Dress Shirt & Tie':'قميص ورابطة عنق','Red Carpet Gown':'فستان السجادة الحمراء',
  'Diplomatic Attire':'لباس دبلوماسي','Wedding Guest Outfit':'ملابس حفل زفاف',
  'Classic Lolita':'لوليتا كلاسيكية','Furisode Kimono':'كيمونو فوريسودي','Haori':'هاوري',
  'Elven Outfit':'زي إلف','Dog Girl Outfit':'زي فتاة كلب','Horse Girl Outfit':'زي فتاة حصان',
  'Cow Girl Costume':'زي فتاة بقرة','Rabbit Kigurumi':'كيغورومي أرنب',
  'Wolf Costume':'زي ذئب','Dirndl (German)':'درنديل ألماني',
  'High-Cut Swimsuit':'مايوه بقطع عالٍ','Rash Guard':'قميص واقٍ','Schoolgirl Costume':'زي طالبة',
  'Stewardess Costume':'زي مضيفة','Secretary Outfit':'زي سكرتيرة','Cat Maid':'خادمة قطة',
  'Brazilian Bikini':'بيكيني برازيلي','Thong Bikini':'بيكيني ثونغ','Wet Bikini':'بيكيني مبلل',
  'Babydoll':'بيبي دول','Lace Lingerie':'لانجري دانتيل','Corset & Stockings':'كورسيه وجوارب',
  'Body Stocking':'جوارب كاملة','No Bra':'بلا حمالة','Panties Visible':'ملابس داخلية ظاهرة',
  'Crotchless Outfit':'زي مفتوح','Latex Bodysuit':'بدلة لاتكس','PVC Outfit':'زي PVC',
  'Harness':'حزام تقييد','Bondage Outfit':'زي بوندج','Catsuit':'بدلة قطة',
  // ── Actions ──
  'Eating food':'يأكل طعاماً','Drinking coffee':'يشرب قهوة','Reading a book':'يقرأ كتاباً',
  'Typing on laptop':'يكتب على الحاسوب','Talking on phone':'يتحدث بالهاتف',
  'Listening to music':'يستمع للموسيقى','Cooking':'يطبخ','Shopping':'يتسوق',
  'Studying':'يدرس','Playing video games':'يلعب ألعاب فيديو','Watching TV':'يشاهد التلفاز',
  'Running':'يركض','Jumping':'يقفز','Kicking a ball':'يركل كرة','Riding a bicycle':'يركب دراجة',
  'Skateboarding':'يركب سكيت بورد','Swimming':'يسبح','Stretching':'يتمدد',
  'Doing yoga':'يمارس اليوغا','Training at gym':'يتدرب في الجيم','Playing tennis':'يلعب تنس',
  'Walking a dog':'يمشي مع كلب','Taking a selfie':'يلتقط سيلفي','Dancing':'يرقص',
  'Singing':'يغني','Playing guitar':'يعزف غيتار','Painting':'يرسم',
  'Writing in journal':'يكتب في مفكرة','Hugging':'يحتضن','Waving hello':'يلوح بالتحية',
  'Having a picnic':'يتنزه في نزهة','Drawing a sword':'يسحب سيفاً','Casting a spell':'يصنع تعويذة',
  'Aiming a bow':'يسدد قوساً','Throwing a shuriken':'يرمي شوريكن',
  'Blocking an attack':'يصد هجوماً','Leaping into battle':'يقفز للمعركة',
  'Firing a gun':'يطلق نار','Running from danger':'يهرب من خطر',
  'Injecting with syringe':'حقن بالإبرة','Holding umbrella in rain':'يمسك مظلة تحت المطر',
  'Picking flowers':'يقطف الزهور','Sitting by window':'يجلس بجوار النافذة',
  'Looking at the sky':'ينظر للسماء','Sleeping':'نائم','Waking up':'يستيقظ','Bathing':'يستحم',
  // ── NSFW Pose new ──
  'Mating Press':'ضغط تزاوج','Prone Bone':'وضعية بطنية','Against Wall':'على الجدار',
  'Lotus Position':'وضعية اللوتس','Spoon Position':'وضعية الملعقة','Pile Driver':'حفار',
  'Leg Lock':'قفل الساق','Suspended Congress':'معلق','Blowjob':'فموي',
  'Cunnilingus':'تلسيق','Double Penetration':'اختراق مزدوج','Threesome':'ثلاثي',
  'Facial':'قذف على الوجه','Creampie':'قذف داخلي','Spread Eagle':'أرجل مفتوحة كلياً',
  'Legs Up':'أرجل لأعلى','Bent Over':'منحنٍ','Sitting On Face':'جلوس على الوجه',
  'Squatting':'جلسة منخفضة','On Back Legs Open':'على الظهر وأرجل مفتوحة',
  'Tied Spread Eagle':'مقيد وأرجل مفتوحة','Suspended':'معلق','Collared & Leashed':'بطوق وسلسلة',
  'Blindfolded':'معصوب العينين','Gagged':'كمامة','Spanked':'مضروب',
  'Masturbating':'استمناء','Inserting Toy':'إدخال لعبة','Using Vibrator':'استخدام مدلك',
  // ── NSFW Objects ──
  'Finger':'إصبع','Two Fingers':'إصبعان','Three Fingers':'ثلاثة أصابع',
  'Whole Hand':'يد كاملة','Fist':'قبضة','Strap-On':'سحاب','Wand Vibrator':'عصا مدلكة',
  'Cock Ring':'خاتم','Rope / Bondage Rope':'حبل تقييد','Spreader Bar':'عارضة فصل',
  'Nipple Clamps':'مشابك حلمات','Gag Ball':'كرة فم','Enema':'حقنة شرجية',
  'Condom':'واقٍ ذكري','Lube Bottle':'زجاجة مزلق','Whipped Cream':'كريمة مخفوقة',
  'Honey':'عسل',
  // ── Hair Gender Filter ──
  'All':'الكل','Female':'أنثى','Male':'ذكر','Shared':'مشترك',
  // ── Filter cards ──
  'Casual':'كاجوال','School':'مدرسي','Uniform':'زي رسمي','Formal':'رسمي',
  'Japanese':'ياباني','Animal':'حيوانات','Fantasy':'خيالي','Swim':'سباحة','Cultural':'تراثي',
  'Condition':'الحالة','Accessories':'إكسسوارات','Socks':'جوارب','Shoes':'أحذية',
  'Eyes':'عيون','Face Acc':'إكسسوارات وجه','Direction':'الاتجاه',
  'Expression':'تعبير','Pose':'وضعية','Effects':'تأثيرات','Liquids':'سوائل',
  'Weapons':'أسلحة','Props':'أدوات','Electronics':'إلكترونيات','Other':'أخرى',
  'Art Style':'أسلوب رسم','Studio':'استوديو','Color':'ألوان','Lines':'خطوط',
  'Quality':'جودة','Lighting':'إضاءة','Environment':'بيئة',
  'Angle':'زاوية','Shot':'لقطة','Lens':'عدسة','Body':'جسم','Hair':'شعر',
  'Daily':'يومي','Sports':'رياضة','Social':'اجتماعي','Combat':'قتال',
  // ── Clothing separator labels ──
  'Role-Play':'تمثيل أدوار','Swimwear':'ملابس سباحة','Lingerie':'لانجري',
  'Revealing':'كاشفة','Fetish':'فيتيش','Positions':'وضعيات','Acts':'أفعال',
  'Poses':'أوضاع','BDSM':'BDSM','Self':'ذاتي',
  'Damage':'أضرار','Dirty':'متسخ','Stains':'بقع',
};

const OPT_LABELS = { ar: OPT_AR };

/* ── Japanese UI strings ── */
UI.ja = {
  random:'ランダム', nsfw:'NSFW', saved:'保存済み',
    ms_characters:'キャラクター', ms_scene:'シーン',
  tab_style:'スタイル', tab_mood:'ムード', tab_scene:'シーン', tab_look:'外見', tab_outfit:'衣装',
  tab_camera:'カメラ', tab_quality:'品質', tab_character:'キャラ',
  tab_tools:'道具', tab_avoid:'除外',
  positive_prompt:'ポジティブ', negative_prompt:'ネガティブ',
  copy_full:'全コピー', copy_pos:'ポジティブ', copy_neg:'ネガティブ',
  save_fav:'お気に入り保存', saved_library:'保存ライブラリ', fav_empty:'保存済みなし',
  reset_all:'全リセット', footer_copy:'Anime Prompt Studio © 2026. All rights reserved.',
  clear:'クリア', clear_all:'全クリア',
  prompt_empty:'右側からオプションを選択してください…',
  neg_empty:'上で除外項目を選択するか、下に入力してください…',
  placeholder_pos:'＋ 追加ポジティブタグ — EnterまたはTab',
  placeholder_neg:'＋ 追加ネガティブタグ — EnterまたはTab',
  tags:' タグ',
  blueprint_ttl:'キャラクター設計図',
  prompt_strength:'プロンプト強度',
  color_themes:'カラーテーマ', help_info:'ヘルプ',
  about:'概要', features:'機能', tips:'ヒント',
  language:'言語',
  girls:'女の子', boys:'男の子', start_building:'今すぐ始める',
  sec_color_grading:'カラーグレーディング', sec_anime_studio:'スタジオ / 監督スタイル',
  sec_art_style:'アートスタイル', sec_era:'時代', sec_line_style:'線のスタイル',
  sec_shadows:'シャドウ', sec_glow:'グロー＆ブルーム', sec_skin_smooth:'肌の滑らかさ',
  sec_quality_tags:'クオリティタグ', sec_lighting:'ライティング',
  sec_characters:'シーンのキャラクター', sec_age:'年齢グループ',
  sec_skin_tone:'肌の色', sec_body:'体型', sec_hairstyle:'髪型',
  sec_hair_color1:'髪色（メイン）', sec_hair_color2:'グラデーション（サブ）',
  sec_eye_shape:'目の形', sec_eye_color:'目の色',
  sec_clothing:'服の種類', sec_clothing_acc:'服のアクセサリー',
  sec_sock_color:'靴下の色', sec_sock_length:'靴下の長さ',
  sec_footwear:'履き物', sec_face_acc:'顔のアクセサリー',
  sec_expression:'表情', sec_pose:'ポーズ＆アクション',
  sec_effects:'特殊効果', sec_liquids:'液体＆素材',
  sec_weapons:'武器', sec_props:'小道具', sec_electronics:'電子機器', sec_other:'その他',
  sec_environment:'環境', sec_mood:'ムード＆雰囲気',
  sec_shot_range:'ショット範囲', sec_camera_angle:'カメラアングル',
  sec_looking:'視線方向', sec_lens_type:'レンズタイプ',
  sec_lens_effect:'レンズ効果', sec_body_parts:'ボディフォーカス',
  sec_neg_prompt:'ネガティブ', sec_tools:'オブジェクト', sec_look:'外見', sec_outfit:'衣装',
  what_to_avoid:'除外項目',
  avoid_desc:'最終画像から除外したいものを選択してください。',
  neg_body_anatomy:'ボディ＆解剖', neg_image_quality:'画像品質',
  body_parts_note:'特定のボディパーツにカメラをフォーカス — NSFWモード限定。',
  bp_char:'キャラ', bp_age:'年齢', bp_skin:'肌・体型',
  bp_hair:'髪', bp_eyes:'目', bp_outfit:'衣装',
  bp_mood:'ムード', bp_tools:'オブジェクト', bp_scene:'シーン',
  bp_camera:'カメラ', bp_quality:'品質',
  tab_tools:'オブジェクト', tab_layers:'レイヤー', tab_pose:'ポーズ',
  about_p1:'Anime Prompt Studioは、AIイメージ生成のための詳細で高品質なプロンプトを作成するための無料ブラウザツールです。',
  about_p2:'アニメとイラストスタイルに特化して構築され、キャラクターの外見、衣装、ムード、シーン、ライティング、カメラなどを完全にコントロールできます。',
  about_p3:'アカウント不要。データ収集なし。すべてブラウザ内でローカルに動作します。',
  about_sig:'— MD.AI SYSTEMS が ✦ を込めて制作',
  feat_themes_t:'13カラーテーマ', feat_themes_d:'スタイルに合わせて変わるテーマUI',
  feat_char_t:'フルキャラクタービルダー', feat_char_d:'髪、目、肌、体型、衣装など',
  feat_cloth_t:'50+の服装オプション', feat_cloth_d:'カテゴリ別に整理されたトップス・ボトムス・フルアウトフィット',
  feat_studio_t:'アニメスタジオスタイル', feat_studio_d:'ジブリ、ufotable、MAPPA、新海誠など',
  feat_color_t:'カラーグレーディング', feat_color_d:'パステルからサイバーパンクまで16パレット',
  feat_cam_t:'カメラコントロール', feat_cam_d:'ショット範囲、角度、レンズタイプとフォーカス効果',
  feat_meter_t:'プロンプト強度メーター', feat_meter_d:'コンフリクト、過負荷、欠落要素を検出',
  feat_weight_t:'タグウェイトスライダー', feat_weight_d:'タグをクリックして影響力を調整',
  feat_favs_t:'お気に入りシステム', feat_favs_d:'最高のプロンプトを保存してリロード',
  feat_img_t:'画像アナライザー', feat_img_d:'画像からプロンプトを抽出・リバースエンジニアリング',
  feat_rand_t:'ランダマイザー', feat_rand_d:'ワンクリックでランダムキャラを生成',
  feat_nsfw_t:'NSFWモード', feat_nsfw_d:'年齢確認済みアダルトコンテンツ',
  tip1_t:'スタイルから始める', tip1_d:'まずアートスタイルまたはアニメスタジオを選ぶ — 最終的な見た目に最も影響するタグです。',
  tip2_t:'強度メーターを使う', tip2_d:'プロンプト強度スコアに注目。コンフリクト（赤）が品質を最も下げます。',
  tip3_t:'ライティングがすべて', tip3_d:'少なくとも1つのライティングタイプを追加。リムライト＋環境光でドラマチックな結果に。',
  tip4_t:'タグウェイトスライダー', tip4_d:'プロンプトボックスのタグをクリックしてウェイトスライダーを開く。スタイルやライティングは1.3以上に設定。',
  tip5_t:'クオリティタグが重要', tip5_d:'Masterpiece、Best Quality、Ultra Detailedを必ず3〜4個含めること。',
  tip6_t:'少ない方が多い', tip6_d:'3〜4種類のライティングや5個以上のエフェクトはモデルを混乱させます。オーバーロード警告が出たら注意。',
  tip7_t:'お気に入りを保存', tip7_d:'良い組み合わせが見つかったら♡ボタンで保存。いつでもお気に入りメニューからロードできます。',
  tip8_t:'追加タグを活用', tip8_d:'追加ポジティブタグフィールドはモデル固有のトークンや細かいディテールに最適です。',
  wlc_sub:'最高のAIイメージプロンプトビルダー — 無料・高速・アカウント不要。',
  wlc_about_title:'このプロジェクトについて',
  wlc_about_body:'Anime Prompt Studioは<span class="wlc-brand">MD.AI SYSTEMS</span>が情熱を持って制作したプロジェクトです。AIツールを誰もが使いやすく楽しめるようにすることを目指しています。ブラウザ内で完全に動作し、サーバーには何も保存されず、完全無料です。',
  wlc_footer:'アカウント不要 · データ収集なし · ブラウザで動作',
  wlc_feat1_t:'フルキャラクタービルダー', wlc_feat1_d:'髪、目、肌、体型、衣装など',
  wlc_feat2_t:'5カラーテーマ', wlc_feat2_d:'スタイルに合わせた完全テーマUI',
  wlc_feat3_t:'プロンプト強度メーター', wlc_feat3_d:'コンフリクトと欠落要素を検出',
  wlc_feat4_t:'お気に入りシステム', wlc_feat4_d:'最高の組み合わせを保存・リロード',
  wlc_feat5_t:'ワンクリックランダマイザー', wlc_feat5_d:'フルキャラを即時生成',
  wlc_feat6_t:'タグウェイトスライダー', wlc_feat6_d:'各タグの影響力を微調整',
  ag_title:'18歳以上限定', ag_subtitle:'NSFWコンテンツ警告',
  ag_body1:'このセクションには成人向けのコンテンツが含まれています。',
  ag_body2:'続行することで、以下を確認します：',
  ag_check1:'私は18歳以上です',
  ag_check2:'このコンテンツの使用について全責任を負います',
  ag_check3:'私の国または地域でこのコンテンツへのアクセスは合法です',
  ag_check4:'生成されたプロンプトを違法なコンテンツ作成に使用しません',
  ag_disclaimer:'このツールの作成者は、いかなる誤用、有害なコンテンツ生成、またはサードパーティプラットフォームの利用規約違反についても<strong>一切責任を負いません</strong>。このツールはテキストプロンプトのみを生成します。使用方法はお客様の責任です。',
  ag_no:'いいえ、18歳未満です', ag_yes:'はい、18歳以上です',
  ag_footer:'⚠️ 芸術的なプロンプト生成のみを目的としています',
};

/* ── Japanese option labels ── */
OPT_LABELS.ja = {
  // Characters
  '1 Girl':'女の子1人','1 Man':'男性1人','2 Girls':'女の子2人','2 Men':'男性2人',
  '1 Girl + 1 Man':'女の子と男性','3+ Girls':'女の子3人以上','3+ Men':'男性3人以上','Mixed Group':'混合グループ',
  // Age
  'Toddler (0–3)':'幼児(0〜3)','Child (4–8)':'子供(4〜8)','Preteen (9–12)':'小学生(9〜12)',
  'Teen (13–17)':'ティーン(13〜17)','Young Adult (18–25)':'若者(18〜25)',
  'Adult (26–35)':'成人(26〜35)','Middle-Aged (36–50)':'中年(36〜50)','Elderly (51+)':'高齢者(51+)',
  // Gender
  'Feminine':'女性的','Masculine':'男性的','Androgynous':'中性的',
  // Body
  'Petite':'小柄','Slim':'スリム','Athletic':'アスリート','Toned':'引き締まり','Curvy':'グラマー',
  'Hourglass':'砂時計型','Muscular':'筋肉質','Chubby':'ぽっちゃり','Tall':'高身長','Short':'低身長',
  // Skin
  'Porcelain':'磁器肌','White':'白肌','Pink':'ピンク肌','Normal':'普通',
  'Navy':'ネイビー','Black':'黒',
  // Hairstyle
  'Long Straight':'ロングストレート','Long Wavy':'ロングウェービー','Long Curly':'ロングカーリー',
  'Twin Tails':'ツインテール','High Ponytail':'ハイポニー','Side Ponytail':'サイドポニー',
  'Braid':'三つ編み','Double Braid':'ダブル三つ編み','Bun':'お団子','Messy Bun':'くしゃお団子',
  'Short Bob':'ショートボブ','Pixie Cut':'ピクシーカット','Hime Cut':'姫カット','Fluffy':'ふわふわ',
  'Wet Hair':'濡れ髪',
  // Eye Shape
  'Large Round':'大きな丸目','Almond':'アーモンド','Upturned':'上がり目','Downturned':'垂れ目',
  'Cat-like':'猫目','Doe Eyes':'鹿目','Hooded':'奥二重',
  // Expression
  'Happy':'嬉しい','Sad':'悲しい','Angry':'怒り','Shy':'恥ずかしい','Confident':'自信',
  'Gentle Smile':'穏やかな笑顔','Laughing':'笑い','Crying':'泣き','Scared':'怖い',
  'Stoic':'無表情','Seductive':'誘惑','Tired':'疲れ','Shocked':'驚き','Playful':'遊び心','Mysterious':'神秘的',
  'Dreamy':'夢見がち','Dramatic':'ドラマチック','Eyes Closed':'目を閉じて',
  // Clothing
  'T-Shirt':'Tシャツ','Crop Top':'クロップトップ','Tied Crop Top':'タイドクロップ','Off-Shoulder Top':'オフショルダー',
  'Tank Top':'タンクトップ','Tube Top':'チューブトップ','Sleeveless Top':'ノースリーブ',
  'Long Sleeve Shirt':'長袖シャツ','Button-Up Shirt':'ボタンシャツ','Oversized Shirt':'オーバーシャツ',
  'Graphic Tee':'グラフィックT','Polo Shirt':'ポロシャツ','Ribbed Top':'リブトップ','Halter Top':'ホルタートップ',
  'Hoodie':'パーカー','Zip-Up Hoodie':'ジップパーカー','Oversized Hoodie':'ビッグパーカー','Sweatshirt':'スウェット',
  'Jeans':'ジーンズ','Skinny Jeans':'スキニー','Wide-Leg Jeans':'ワイドジーンズ','Ripped Jeans':'ダメージジーンズ',
  'Shorts':'ショーツ','Denim Shorts':'デニムショーツ','Mini Shorts':'ミニショーツ',
  'High-Waist Shorts':'ハイウエストショーツ','Jogger Pants':'ジョガーパンツ','Sweatpants':'スウェットパンツ',
  'Cargo Pants':'カーゴパンツ','Leggings':'レギンス','Pleated Skirt':'プリーツスカート','Mini Skirt':'ミニスカート',
  'Plaid Skirt':'チェックスカート','Long Skirt':'ロングスカート','Denim Skirt':'デニムスカート',
  'School Uniform':'制服','Sailor Uniform':'セーラー服','Tracksuit':'ジャージ',
  'Casual Streetwear':'カジュアル','Sporty Outfit':'スポーツウェア','Sleepwear / Pajamas':'パジャマ',
  'Swimsuit':'水着','One-Piece Swimsuit':'ワンピース水着','Formal Suit':'フォーマルスーツ',
  'Blazer & Pants':'ブレザーとパンツ','Little Black Dress':'リトルブラックドレス',
  'Evening Gown':'イブニングドレス','Wedding Dress':'ウェディングドレス',
  'Magical Girl':'魔法少女','Maid Outfit':'メイド服','Gothic Lolita':'ゴシックロリータ',
  'Kimono':'着物','Yukata':'浴衣','Fantasy Armor':'ファンタジーアーマー','Ninja Outfit':'忍者衣装',
  'Military Uniform':'軍服',
  // Accessories
  'Ribbon Bow':'リボン','Belt':'ベルト','Choker':'チョーカー','Backpack':'バックパック',
  'Suspenders':'サスペンダー','Gloves':'グローブ','Scarf':'マフラー','Cape':'マント','Apron':'エプロン','Tie':'ネクタイ',
  'Glasses':'メガネ','Round Glasses':'丸メガネ','Sunglasses':'サングラス',
  'Flower Crown':'花冠','Headband':'ヘアバンド','Hair Clip':'ヘアクリップ',
  'Eye Patch':'眼帯','Mask':'マスク','Veil':'ベール','Halo':'光輪','Horns':'ツノ',
  'Crown':'王冠','Animal Ears':'けものミミ',
  // Footwear
  'Sneakers':'スニーカー','Boots':'ブーツ','Heels':'ヒール','Sandals':'サンダル',
  'Loafers':'ローファー','Barefoot':'裸足','Platform':'厚底','School Shoes':'上履き',
  // Sock
  'Thigh-High':'太もも丈','Over-Knee':'ひざ上','Knee-High':'ひざ丈','Ankle':'アンクル',
  // Pose
  'Standing':'立ち','Sitting':'座り','Kneeling':'ひざまずき','Crouching':'しゃがみ',
  'Lying Down':'寝転び','Running':'走り','Jumping':'ジャンプ','Dancing':'ダンス',
  'Fighting Stance':'戦闘ポーズ','Floating':'浮遊','Stretching':'ストレッチ',
  'Drinking':'飲み','Eating':'食べ','Reading':'読書','Sleeping':'睡眠',
  // Effects
  'Fire':'炎','Lightning':'稲妻','Ice Crystals':'氷の結晶','Electricity':'電気',
  'Smoke':'煙','Stars':'星','Sparkles':'キラキラ','Energy Orbs':'エネルギー球',
  'Particles':'パーティクル','Magical Aura':'魔法のオーラ','Magical Glow':'魔法の輝き',
  'Ethereal Glow':'幻想的な輝き','Cherry Blossoms':'桜','Water Splash':'水しぶき',
  'Dew Drops':'朝露','Golden Glow':'金色の輝き','Tears':'涙',
  'Sweat':'汗','Glistening':'輝き',
  // Environment
  'School':'学校','Rooftop':'屋上','City Street':'都市の通り','Night City':'夜の都市',
  'Beach':'ビーチ','Forest':'森','Mountains':'山','Desert':'砂漠','Space':'宇宙',
  'Fantasy Realm':'異世界','Onsen':'温泉','Café':'カフェ','Bedroom':'寝室',
  'Castle':'城','Cherry Blossom Park':'桜公園',
  // Art Style
  'Anime':'アニメ','Manga / Ink':'漫画／墨','Digital Painting':'デジタルペイント',
  'Watercolor':'水彩','Oil Painting':'油彩','Sketch / Pencil':'スケッチ／鉛筆',
  'Cel Shading':'セルシェーディング','Painterly':'絵画的','Concept Art':'コンセプトアート',
  'Flat Design':'フラットデザイン','Vector Art':'ベクターアート','Pixel Art':'ピクセルアート',
  '16-bit Pixel Art':'16bitピクセル','32-bit Pixel Art':'32bitピクセル',
  'Sprite Art':'スプライト','Voxel Art':'ボクセルアート','Low Poly':'ローポリ',
  'Fantasy Art':'ファンタジーアート','Cinematic':'シネマティック',
  // Studio
  'Studio Ghibli style':'スタジオジブリ風','Makoto Shinkai style':'新海誠風',
  'Kyoto Animation style':'京都アニメーション風','MAPPA style':'MAPPA風',
  'Ufotable style':'ufotable風','Trigger style':'トリガー風',
  'Demon Slayer style':'鬼滅の刃風','Attack on Titan style':'進撃の巨人風',
  'Gainax style':'ガイナックス風','Madhouse style':'マッドハウス風',
  'Naruto style':'ナルト風','Dragon Ball style':'ドラゴンボール風',
  'Sailor Moon style':'セーラームーン風','Evangelion style':'エヴァンゲリオン風',
  'Akira style':'AKIRA風','Your Name style':'君の名は風',
  // Era
  '1980s':'1980年代','1990s':'1990年代','2000s':'2000年代','2010s':'2010年代','2020s':'2020年代',
  'Retro 90s Anime':'レトロ90年代アニメ',
  // Line Style
  'Thin Lines':'細線','Medium Lines':'中線','Thick Lines':'太線',
  'Bold Lines':'極太線','Dark Ink':'濃い墨','No Outline':'輪郭なし','Soft Edges':'ソフトエッジ',
  // Shadows
  'No Shadows':'影なし','Soft Shadows':'柔らかい影','Medium Shadows':'中程度の影','Hard Shadows':'強い影',
  // Glow
  'No Glow':'グローなし','Soft Glow':'柔らかいグロー','Warm Glow':'暖かいグロー','Magical Glow':'魔法のグロー',
  // Skin Smooth
  'Normal':'普通','Smooth Skin':'なめらか肌','Silky':'シルキー','Sheer':'透け感','Textured':'テクスチャー',
  // Color Grading
  'Muted / Desaturated':'くすみカラー','Warm Tones':'ウォームトーン','Cool Tones':'クールトーン',
  'Pastel Palette':'パステル','Neon Palette':'ネオン','HDR Colors':'HDR','Duotone':'デュオトーン',
  'Vibrant / Saturated':'ビビッド','Monochrome Red':'赤モノクロ','Monochrome Blue':'青モノクロ',
  'Cyberpunk Colors':'サイバーパンク','Golden Hour Tones':'ゴールデンアワー','Earthy Tones':'アーシー',
  'Black & White':'白黒','Vintage / Faded':'ヴィンテージ',
  // Lighting
  'Natural Light':'自然光','Sunlight':'陽光','Golden Hour':'ゴールデンアワー',
  'Moonlight':'月明かり','Candlelight':'キャンドル光','Neon Light':'ネオン光',
  'Studio Light':'スタジオ光','Backlight':'バックライト','Rim Light':'リムライト',
  'Soft Diffused':'柔らかい拡散光','Dramatic':'ドラマチック',
  // Quality
  'Masterpiece':'傑作','Best Quality':'最高品質','Ultra Detailed':'超精細',
  'High Resolution':'高解像度','4K':'4K','8K':'8K','Award-Winning':'受賞作品',
  // Negative
  'Bad Anatomy':'解剖異常','Deformed Hands':'変形した手','Mutated Fingers':'変異した指',
  'Extra Fingers':'余分な指','Missing Fingers':'指の欠如','Extra Limbs':'余分な手足',
  'Floating Limbs':'浮遊する手足','Deformed Legs':'変形した脚','Missing Legs':'脚の欠如',
  'Extra Legs':'余分な脚','Bad Feet':'異常な足','Disconnected Body':'分離した体',
  'Ugly Face':'醜い顔','Weird Proportions':'変な比率','Duplicate Character':'重複キャラ',
  'Blurry':'ぼやけ','Low Quality':'低品質','JPEG Artifacts':'JPEGアーティファクト',
  'Artifacts':'アーティファクト','Noise/Grain':'ノイズ/グレイン','Overexposed':'露出過多',
  'Underexposed':'露出不足','Watermark/Text':'透かし','Cropped':'切り取り',
  'Out of Frame':'フレーム外','Flat Colors':'フラットカラー','Washed Out':'色褪せ',
  // Shot Range
  'Extreme Closeup':'超接写','Face Closeup':'顔接写','Headshot':'ヘッドショット',
  'Bust Shot':'バストショット','Waist Up':'ウエストアップ','Full Body':'全身',
  'Full Environment':'全景','Macro':'マクロ',
  // Camera
  'Eye Level':'目線','Low Angle':'ローアングル','High Angle':'ハイアングル',
  "Bird's Eye":'俯瞰','Side Profile':'横顔','Over Shoulder':'肩越し',
  'Focus Face':'顔フォーカス','Focus Body':'体フォーカス','Standard':'標準',
  // Looking
  'At Viewer':'視聴者へ','Away':'そっぽ','Up':'上','Down':'下','To the Side':'横',
  // Lens
  'Wide Angle':'広角','Telephoto':'望遠','85mm Portrait':'85mmポートレート','Fisheye':'魚眼',
  'Soft Focus':'ソフトフォーカス','Sharp Focus':'シャープフォーカス','Depth of Field':'被写界深度',
  'Bokeh / Blurred BG':'ボケ','Digital Camera':'デジカメ','Drone':'ドローン',
  // Weapons
  'Sword':'剣','Katana':'刀','Twin Blades':'双剣','Dagger':'短剣','Axe':'斧',
  'Spear':'槍','Bow & Arrow':'弓矢','Crossbow':'クロスボウ','Rifle':'ライフル',
  'Pistol':'ピストル','Sniper':'スナイパー','Machine Gun':'機関銃','Shotgun':'ショットガン',
  'Bazooka':'バズーカ','Grenade':'手榴弾','Magic Staff':'魔法の杖',
  'Magic Wand':'魔法の棒','Scepter':'王笏','Scythe':'鎌',
  'Shield':'盾','Rope':'縄','Bomb':'爆弾',
  // Props
  'Book':'本','Scroll':'巻物','Map':'地図','Compass':'コンパス','Lantern':'ランタン',
  'Candle':'ろうそく','Mirror':'鏡','Potion Bottle':'ポーション瓶','Treasure Chest':'宝箱',
  'Rose':'バラ','Lollipop':'ロリポップ','Teddy Bear':'テディベア','Fan':'扇子',
  'Umbrella':'傘','Briefcase':'ブリーフケース','Broom':'ほうき','Letter/Envelope':'手紙/封筒',
  'Flag':'旗','Guitar':'ギター','Violin':'バイオリン','Microphone':'マイク',
  // Electronics
  'Smartphone':'スマホ','Laptop':'ラップトップ','Tablet':'タブレット',
  'Gaming Controller':'ゲームコントローラー','Smart Watch':'スマートウォッチ','Headphones':'ヘッドフォン',
  'VR Headset':'VRヘッドセット','Camera':'カメラ','TV Remote':'リモコン',
  // Other
  'Medical Kit':'救急箱','Crown':'王冠','Trophy':'トロフィー',
  // Liquids/Materials
  'Rain-Soaked':'雨濡れ','Water Splash':'水しぶき','Body Oil':'ボディオイル',
  'Sweat Droplets':'汗の雫','Dripping':'滴り',
  // Hair/Eye Colors
  'White':'白','Silver':'銀','Blonde':'金髪','Gold':'ゴールド','Peach':'ピーチ',
  'Coral':'コーラル','Red':'赤','Auburn':'オーバーン','Pink':'ピンク','Magenta':'マゼンタ',
  'Purple':'紫','Violet':'バイオレット','Lavender':'ラベンダー','Indigo':'インディゴ',
  'Blue':'青','Cyan':'シアン','Teal':'ティール','Mint':'ミント','Emerald':'エメラルド',
  'Green':'緑','Jade':'翡翠','Brown':'茶','Amber':'琥珀','Grey':'グレー','Rainbow':'虹',
  'Sapphire':'サファイア',
  // Mood
  'Mysterious':'神秘的','Professional':'プロフェッショナル',
  // NSFW
  'Bare Legs':'素足','Bare Midriff':'へそ出し','Cleavage':'胸元','Torn Clothes':'破れた服',
  'Unbuttoned':'ボタン開け','Wet Clothes':'濡れた服',
  'Breasts':'胸','Nipples':'乳首','Visible Areolas':'乳輪','Pasties Only':'パスティーのみ',
  'Penis (Male)':'男性器','Vagina':'女性器','Anus':'肛門','Female Discharge':'女性の分泌物',
  'Missionary':'正常位','Cowgirl':'騎乗位','Reverse Cowgirl':'逆騎乗位','Doggy Style':'後背位',
  'Oral':'オーラル','Anal':'アナル','Gangbang':'乱交','Glory Hole':'グローリーホール',
  // ── Clothing Condition ──
  'Wet':'濡れ','Soaked':'びしょ濡れ','Torn':'破れ','Dirty':'汚れ','Muddy':'泥まみれ',
  'Blood-Stained':'血まみれ','Burnt':'焦げ','Wrinkled':'しわ','Disheveled':'乱れ',
  // ── NSFW Clothing ──
  'Bunny Suit':'バニースーツ','Nurse Outfit':'ナース服','French Maid':'フレンチメイド',
  'Cheerleader':'チアリーダー','Police Costume':'ポリス衣装',
  'Fishnet Top':'フィッシュネットトップ','Fishnet Stockings':'フィッシュネットストッキング',
  'Cutout Top':'カットアウトトップ','Micro Crop Top':'マイクロクロップ','Exposed Midriff Top':'へそ出しトップ',
  'Open Back Top':'バックレストップ','Sheer Top':'シアートップ','Strapless Bra Top':'ストラップレスブラ',
  'Tiny Top':'タイニートップ','Garter Belt':'ガーターベルト',
  'Thong':'Tバック','Micro Miniskirt':'マイクロミニ','Slit Skirt':'スリットスカート',
  'Booty Shorts':'ブーティーショーツ','Lace Shorts':'レースショーツ','Crotchless Shorts':'クロッチレス',
  'Lingerie':'ランジェリー','See-through':'シースルー','No Bra':'ノーブラ',
  'Swimwear':'水着','Micro Bikini':'マイクロビキニ','Bikini':'ビキニ',
  'Micro Skirt':'マイクロスカート','Panties Visible':'パンツ見え','Panty Shot':'パンチラ',
  'Skirt Lifted':'スカートめくり','Upskirt':'アップスカート','Topless':'トップレス',
  'Naked':'裸','Nude':'ヌード','Nude Macro':'ヌードマクロ',
  'Collar & Leash':'首輪とリード','Tied Up':'縛られ','Handcuffs/BDSM':'手錠',
  // ── NSFW Body ──
  'Slim Waist':'細いウエスト','Big Butt':'大きなお尻','Thick Thighs':'太もも',
  'Curvy Hips':'丸いヒップ','Small Breasts':'小さな胸','Large Breasts':'大きな胸',
  'Huge Breasts':'巨乳','Erect Nipples':'勃起した乳首',
  // ── NSFW Poses ──
  'Spread Legs':'開脚','On All Fours':'四つん這い','Self-Touching':'自己愛撫',
  'Fingering':'指で','Crotch Shot':'クロッチショット','Between Legs':'股間',
  // ── NSFW Fluids ──
  'Cum':'精液','Cum on Face':'顔射','Cum on Body':'体射','Cum Inside':'中出し',
  'Urine/Squirt':'尿/潮吹き','Vaginal Fluid':'愛液','Anal Fluid':'アナル液',
  'Milk/Lactation':'母乳','Semen Stain':'精液染み','Urine Stain':'尿染み',
  'Fecal Stain':'便染み','Feces (Scat)':'スカトロ',
  // ── NSFW Environments ──
  'Shower':'シャワー','Bathroom':'バスルーム','Onsen Bath':'温泉風呂','Hotel Room':'ホテルの部屋',
  'Locker Room':'ロッカールーム','In Bed':'ベッドで','Sex Dungeon':'ダンジョン',
  'Public Outdoor':'屋外公共','Adult Club':'アダルトクラブ',
  // ── NSFW Shots ──
  'Closeup Breasts':'胸アップ','Closeup Nipples':'乳首アップ',
  'Closeup Vagina':'女性器アップ','Closeup Anus':'肛門アップ','Closeup Penis':'男性器アップ',
  // ── Colors missing ──
  'Beige':'ベージュ','Gray':'グレー','Light Gray':'ライトグレー','Dark Gray':'ダークグレー',
  'Crimson':'クリムゾン','Maroon':'マルーン','Orange':'オレンジ','Yellow':'黄色',
  'Olive':'オリーブ','Hot Pink':'ホットピンク','Sky Blue':'スカイブルー','Light Blue':'ライトブルー',
  'Dark Green':'ダークグリーン','Dark Brown':'ダークブラウン','Sandy':'サンディ',
  // ── Body (missing) ──
  'None':'なし','Chibi':'ちびキャラ',
  // ── Props/Other ──
  'Hammer':'ハンマー','Fishing Rod':'釣竿',
  'Wet/Soaked':'濡れ/びしょ濡れ',
  // ── Clothing Condition ──
  'Plaid':'プレイド',
  // ── Sex Toys ──
  'Sex Toy':'大人のおもちゃ','Dildo':'ディルド','Vibrator':'バイブ','Anal Plug':'アナルプラグ',
  // ── Baby/Hygiene items ──
  'Diaper (Baby)':'おむつ（赤ちゃん）','Female Diaper':'女性用おむつ','Sanitary Pad':'生理用品',
  // ── Striped already in JA ──
  'Striped':'ストライプ',
};

/* ── Language detection: saved > device > EN default ── */
function detectLang(){
  const saved = localStorage.getItem('aps_lang');
  if(saved && UI[saved]) return saved;
  const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  if(nav.startsWith('ar')) return 'ar';
  if(nav.startsWith('ja')) return 'ja';
  return 'en';
}
let _lang = detectLang();

function t(key){ return (UI[_lang]||UI.en)[key] || (UI.en)[key] || key; }
function optLabel(en){
  const map = OPT_LABELS[_lang];
  return map ? (map[en]||en) : en;
}



function applyLang(lang){
  _lang = lang;
  localStorage.setItem('aps_lang', lang);
  const isRtl = lang === 'ar';

  document.documentElement.setAttribute('lang', lang);

  // HTML-containing keys (use innerHTML not textContent)
  const htmlKeys = new Set(['wlc_about_body','ag_disclaimer']);

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if(!val) return;
    if(htmlKeys.has(key)) el.innerHTML = val;
    else el.textContent = val;
  });

  // Update placeholders
  const pi = document.getElementById('posTagInput');
  const ni = document.getElementById('negTagInput');
  if(pi) pi.placeholder = t('placeholder_pos');
  if(ni) ni.placeholder = t('placeholder_neg');

  // Update empty prompt states
  const pe = document.getElementById('promptText');
  const ne = document.getElementById('negativeText');
  if(pe && pe.classList.contains('empty')) pe.textContent = t('prompt_empty');
  if(ne && ne.classList.contains('empty')) ne.textContent = t('neg_empty');

  // Translate ALL option buttons (.ob, .cb) — skip color swatches
  document.querySelectorAll('.ob,.cb').forEach(btn => {
    if(btn.getAttribute('data-color')) return; // skip color swatches
    const en = btn.getAttribute('data-en');
    if(!en) return;
    const span = btn.querySelector('span');
    const translated = optLabel(en);
    if(span) span.textContent = translated;
    else btn.textContent = translated;
  });

  // Translate separator divs
  document.querySelectorAll('.og-sep').forEach(sep => {
    const en = sep.getAttribute('data-en') || sep.textContent;
    if(!sep.getAttribute('data-en')) sep.setAttribute('data-en', en);
    sep.textContent = optLabel(en);
  });

  // Translate Blueprint cell labels
  const bpMap = {
    'bp-char':'bp_char','bp-outfit':'bp_outfit',
    'bp-mood':'bp_mood','bp-tools':'bp_tools','bp-style':'bp_style',
    'bp-scene':'bp_scene','bp-camera':'bp_camera','bp-quality':'bp_quality'
  };
  Object.entries(bpMap).forEach(([id,key])=>{
    const el = document.getElementById(id);
    if(el){ const lbl=el.querySelector('.bp-lbl'); if(lbl) lbl.textContent=t(key); }
  });

  // Translate skin tone buttons (they use title attribute)
  document.querySelectorAll('.sb').forEach(btn => {
    const en = btn.getAttribute('data-en');
    if(!en) return;
    const span = btn.querySelector('span');
    const translated = optLabel(en);
    if(span) span.textContent = translated;
  });

  // Update flag button text (EN / AR label)
  document.getElementById('langFlag').textContent = LANG_FLAGS[lang]||'🌐';

  // Update active state
  document.querySelectorAll('.lang-opt').forEach(b=>{
    b.classList.toggle('on', b.dataset.lang===lang);
  });

  document.getElementById('langTray').classList.remove('open');
}

// Lang tray toggle
document.getElementById('langBtn').addEventListener('click', e=>{
  e.stopPropagation();
  document.getElementById('langTray').classList.toggle('open');
});
document.querySelectorAll('.lang-opt').forEach(b=>{
  b.addEventListener('click', ()=>applyLang(b.dataset.lang));
});
document.addEventListener('click', e=>{
  if(!e.target.closest('#langWrap')) document.getElementById('langTray').classList.remove('open');
});

initModal();
init();
applyLang(_lang);
attachAllTriggers();
attachHairEyePopups();

/* ═══════════════════════════════════
   FIREBASE AUTH + FIRESTORE SYNC
═══════════════════════════════════ */
(function initAuth(){
  // Wait for Firebase module to expose _fbAuth / _fbFavs
  let _attempts = 0;
  function tryInit(){
    if(!window._fbAuth || !window._fbFavs){
      if(++_attempts < 30){ setTimeout(tryInit, 200); }
      return;
    }
    setupAuth();
  }
  tryInit();

  function setupAuth(){
    const loginBtn   = document.getElementById('loginBtn');
    const authMenu   = document.getElementById('authMenu');
    const logoutBtn  = document.getElementById('logoutBtn');
    const authAvatar = document.getElementById('authAvatar');
    const authName   = document.getElementById('authName');
    const authEmail  = document.getElementById('authEmail');

    let _uid = null;
    let _menuOpen = false;
    let _firstAuthCall = true;

    // ── Auth state listener ──
    window._fbAuth.onAuth(user => {
      _uid = user ? user.uid : null;
      window._currentUser = user || null;
      if(user){
        _firstAuthCall = false;
        loginBtn.innerHTML = `<img src="${user.photoURL||''}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.6);" onerror="this.style.display='none'"><span>${user.displayName?.split(' ')[0]||'User'}</span>`;
        loginBtn.style.padding = '.28rem .65rem';
        authAvatar.src   = user.photoURL || '';
        authName.textContent  = user.displayName || '';
        authEmail.textContent = user.email || '';
        loadFavsFromCloud(_uid);
        loadCharLibFromCloud(_uid);
      } else {
        // Disable NSFW on logout
        if(S && S.nsfw){
          S.nsfw = false;
          const nb = document.getElementById('nsfwBtn');
          if(nb) nb.classList.remove('on');
          if(typeof toggleNSFW === 'function') toggleNSFW(false);
          if(typeof rebuild === 'function') rebuild();
        }
        if(_firstAuthCall){ _firstAuthCall = false; return; }
      }
    });

    // ── Login button ──
    loginBtn.addEventListener('click', async () => {
      if(_uid){
        // Toggle menu
        _menuOpen = !_menuOpen;
        authMenu.style.display = _menuOpen ? 'block' : 'none';
      } else {
        try {
          await window._fbAuth.signIn();
          toast('✅ Signed in successfully');
        } catch(e){
          if(e.code !== 'auth/popup-closed-by-user')
            toast('❌ Sign in failed: ' + e.message);
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', e => {
      if(_menuOpen && !e.target.closest('#authWrap')){
        authMenu.style.display = 'none';
        _menuOpen = false;
      }
    });

    // ── Logout ──
    logoutBtn.addEventListener('click', async () => {
      authMenu.style.display = 'none';
      _menuOpen = false;
      await window._fbAuth.signOut();
      localStorage.removeItem('aps6Favs');
      // Full page reload — clears all state and cache
      window.location.reload();
    });

  } // end setupAuth

  // ── Load favourites from Firestore → replace local ──
  async function loadFavsFromCloud(uid){
    try {
      const cloud = await window._fbFavs.load(uid);
      // احذف تلقائياً المفضلة القديمة بدون state
      const valid = [];
      for(const fav of cloud){
        if(!fav.state && fav._docId){
          await window._fbFavs.del(uid, fav._docId).catch(()=>{});
        } else {
          valid.push(fav);
        }
      }
      S.favourites = valid;
      localStorage.setItem('aps6Favs', JSON.stringify(S.favourites));
      renderFavList();
      const deleted = cloud.length - valid.length;
      if(deleted > 0) toast(`☁️ Loaded ${valid.length} favourites (${deleted} old removed)`,'warn');
      else if(valid.length) toast(`☁️ Loaded ${valid.length} favourites`);
    } catch(e){
      console.warn('loadFavsFromCloud error:', e);
    }
  }

  // ── Load character library from Firestore ──
  async function loadCharLibFromCloud(uid){
    if(!window._fbCharLib) return;
    try {
      const cloud = await window._fbCharLib.load(uid);
      if(!cloud.length) return;
      // Merge: cloud wins, skip duplicates by id
      const local = (typeof csLibrary !== 'undefined') ? csLibrary : [];
      const localIds = new Set(local.map(e => String(e.id)));
      const merged = cloud.concat(local.filter(e => !cloud.some(c => String(c.id)===String(e.id))));
      if(typeof csLibrary !== 'undefined'){
        csLibrary = merged;
        localStorage.setItem('aps_charLib', JSON.stringify(csLibrary));
        if(typeof csRenderLibrary === 'function') csRenderLibrary();
      }
      toast(`☁️ Loaded ${cloud.length} characters from cloud`);
    } catch(e){
      console.warn('loadCharLibFromCloud error:', e);
    }
  }

  // _currentUser is set inside the main onAuth handler above
})();
