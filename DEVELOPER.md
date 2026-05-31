# Anime Prompt Studio — Developer Guide
**v2.1.0 — Refactored Infrastructure**

---

## هيكل الملفات

```
anime-prompt-studio/
│
├── js/                         ← Shared modules (جديد)
│   ├── firebase.js             ← Firebase init + Firestore + auth helpers
│   ├── pwa.js                  ← Service Worker + Install prompt
│   └── bg-effects.js          ← Animated background (orbs, stars, petals, mesh)
│
├── auth.html                   ← صفحة تسجيل الدخول (نظيفة)
├── index.html                  ← التطبيق الرئيسي (نظيف)
├── app.js                      ← منطق التطبيق الرئيسي
├── char-slots.js               ← نظام الشخصيات المتعددة
├── style.css                   ← الـ CSS الرئيسي
├── sw.js                       ← Service Worker (Workbox)
├── manifest.json               ← PWA manifest
├── icon-192.png
└── icon-512.png
```

---

## Shared Modules

### `js/firebase.js`
- Firebase init (app, analytics, auth, Firestore)
- يعرض على window: `_fbAuth`, `_fbFavs`, `_fbCharLib`
- يصدر: `auth`, `onAuthStateChanged`
- **لا تغيّر هذا الملف إلا لو احتجت تضيف Firestore collection جديدة**

### `js/pwa.js`
- Service Worker registration على scope `/anime-prompt-studio/`
- Install prompt (beforeinstallprompt / appinstalled)
- يتحكم بزر `#installBtn` تلقائياً
- **plain script — لا يحتاج `type="module"`**

### `js/bg-effects.js`
- يتحقق من وجود `#authBg` → يشغّل auth orbs
- يتحقق من وجود `#meshBg` → يشغّل mesh gradient للتطبيق
- يتحقق من وجود `#stars` → ينشئ النجوم
- يتحقق من وجود `#petals` → ينشئ بتلات الكرز
- **يعمل على كلا الصفحتين بنفس الملف**

---

## كيفية إضافة تعديلات

### تعديل Auth UI
افتح `auth.html` فقط — كل الـ HTML والـ CSS داخله.

### تعديل App UI / Features
افتح `index.html` للـ HTML، و`style.css` للـ CSS.

### تعديل منطق التطبيق
افتح `app.js` (الـ state + building + UI logic).

### تعديل الشخصيات المتعددة
افتح `char-slots.js`.

### تعديل Firebase / Firestore
افتح `js/firebase.js` — مكان واحد، يسري على كل الصفحات.

### تعديل Service Worker / Caching
افتح `sw.js` — غيّر الـ `revision` لأي ملف تعدّله.

### تعديل PWA Install Prompt
افتح `js/pwa.js`.

### تعديل الخلفية المتحركة
افتح `js/bg-effects.js`.

---

## إضافة Section جديدة في التطبيق

```
1. HTML في index.html:   <div class="og c3" id="myGrid"></div>
2. Data في app.js D{}:   myArr:{lbl:['A','B','C'], arr:'myArr'}
3. State في app.js S{}:  myArr:[],
4. init() في app.js:     makeMulti('myGrid', D.myArr.lbl, 'myArr');
5. buildPosText():        if(S.myArr.length) p.push(S.myArr.join(', '));
```

---

## تحديث Service Worker بعد أي تعديل

في `sw.js`، ابحث عن الملف المعدّل وزوّد الـ `revision`:

```js
{ url: '/anime-prompt-studio/index.html', revision: 'v5' },  // ← زوّد الرقم
```

---

## ترتيب Scripts في index.html

```html
<!-- 1. Firebase (module — يجب أن يكون أول) -->
<script type="module">
  import { auth, onAuthStateChanged } from './js/firebase.js';
  // auth guard هنا
</script>

<!-- 2. App logic (تعتمد على window._fbAuth وغيره) -->
<script src="app.js"></script>
<script src="char-slots.js"></script>

<!-- ... HTML للـ modals ... -->

<!-- 3. PWA + Background (آخر شيء — لا يؤثر على الـ app logic) -->
<script src="js/pwa.js"></script>
<script src="js/bg-effects.js"></script>
```

---

## ترتيب Scripts في auth.html

```html
<!-- 1. Firebase (يستمع لـ auth state — يعمل redirect) -->
<script type="module">
  import { auth, onAuthStateChanged } from './js/firebase.js';
</script>

<!-- 2. PWA + Background -->
<script src="js/pwa.js"></script>
<script src="js/bg-effects.js"></script>

<!-- 3. Auth page logic (doSignIn, doGuest) -->
<script>
  // ...
</script>
```
