# Ce qui a été ajouté (esprit thomasbosc.com)

| Effet chez Thomas Bosc | Où c'est repris ici |
|---|---|
| Nom en double exposition, parallaxe scroll | `Hero.jsx` → calque fantôme (`ghostRef`) qui dérive en sens inverse et s'estompe plus vite |
| Onglets numérotés (Photo/Vidéo/Web/UI-UX/3D) | `Skills.jsx` → onglets `01 02 03 04` avec pastille qui glisse sous l'onglet actif |
| Petites interactions "vivantes" partout | `useMagnetic.js` (nouveau hook) → CTA qui suit légèrement la souris, relâché en douceur |
| Curseur custom | `CustomCursor.jsx` (nouveau composant) → point + anneau qui suit la souris, grossit sur les liens |
| Effet "avant/après" (rideau vidéo) | `Certifications.jsx` → carte qui se retourne au survol (recto badge / verso issuer+ID) + reflet lumineux |
| Cartes photo "posées" négligemment | `Contact.jsx` → léger tilt façon polaroid par carte, qui se redresse au survol |
| Petites légendes qui tournent en bas de page | `RotatingTagline.jsx` (nouveau composant) → phrases dev qui défilent dans le footer |
| Indicateur de nav qui glisse | `Navbar.jsx` → pastille de fond animée qui se déplace vers l'item actif au lieu d'un simple `bg` statique |

## Fichiers créés
- `hooks/useMagnetic.js`
- `components/CustomCursor.jsx`
- `components/RotatingTagline.jsx`

## Fichiers modifiés
- `Hero.jsx`, `Skills.jsx`, `Navbar.jsx`, `Certifications.jsx`, `Contact.jsx`, `Footer.jsx`

## Étapes manuelles à faire toi-même

Ces fichiers n'étaient pas dans l'upload, donc je n'ai pas pu les toucher — voici exactement quoi ajouter.

### 1. Monter le curseur custom
Dans ton `App.jsx` (racine de l'app), ajoute une fois :
```jsx
import CustomCursor from "./components/CustomCursor";
// ...
<CustomCursor />
```

### 2. `index.css` — ajoute ce bloc
```css
/* Curseur custom : on masque le curseur natif sauf sur tactile */
* { cursor: none; }
@media (pointer: coarse) { * { cursor: auto; } }

.cursor-ring--active {
  width: 3rem !important;
  height: 3rem !important;
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.9);
}
```

### 3. Vérifie que ces classes/animations existantes couvrent bien les nouveaux usages
Rien de neuf n'est requis niveau keyframes — tout réutilise `animate-fade-in-up`, `glass-card`, `gradient-text`, `section-reveal`, `tilt-card` déjà présents dans ton projet. Le flip de `Certifications.jsx` utilise uniquement des classes Tailwine arbitraires (`[backface-visibility:hidden]`, `[transform-style:preserve-3d]`) donc aucun ajout CSS nécessaire, à condition d'être sur Tailwind ≥ 3.

### 4. i18n (optionnel)
`Certifications.jsx` référence une nouvelle clé optionnelle `certifications.hint` (avec un repli en dur si absente) — ajoute-la dans tes fichiers de traduction si tu veux la personnaliser :
```json
"certifications": {
  "hint": "survolez un badge pour le retourner"
}
```

## Pourquoi ces choix et pas d'autres

Je n'ai pas ajouté : navigateur factice (mockup Chrome), pop-up cookies/pub faux — ces gags fonctionnent pour un profil "content manager/créatif" mais détonneraient sur un portfolio d'ingénieur logiciel où on veut plutôt paraître rigoureux. J'ai gardé l'esprit "vivant, personnel, un peu joueur" (curseur, tilt, flip, taglines qui tournent) sans le porter jusqu'à l'humour potache du site original.
