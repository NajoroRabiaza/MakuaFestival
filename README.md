# MAKUA Festival Landing Page 🎪🇲🇬

Une page d'accueil moderne pour le **MAKUA Festival** à Madagascar avec fond vidéo, compte à rebours en temps réel et design responsive.

## 🎉 À propos du MAKUA Festival

Le **MAKUA Festival** est un événement culturel et musical majeur qui se déroule à **Toamasina (Tamatave)**, sur la côte Est de Madagascar. Il combine musique, danse, traditions locales, artisanat, carnaval et animations diverses.

### Informations clés :
- 📅 **Dates** : 29 Octobre - 1 Novembre 2026
- 📍 **Lieu** : Toamasina (Tamatave), Madagascar
- 🎭 **Organisateurs** : Makua Entertainment (Shyn & Denise)
- 🤝 **Partenaire** : Commune Urbaine de Toamasina
- 🎵 **Concept** : Festival culturel et musical malgache avec plus de 30 artistes

### Objectifs du festival :
- Mettre en lumière la culture malgache, avec accent sur l'Est
- Promouvoir la scène musicale locale et nationale
- Stimuler le tourisme et l'économie locale
- Favoriser des actions environnementales

## 📁 Structure du Projet

```
makua-festival/
├── src/
│   ├── components/          # Composants React réutilisables
│   │   ├── VideoBackground.jsx    # Gestion du fond vidéo
│   │   ├── Header.jsx             # En-tête avec navigation
│   │   ├── Countdown.jsx          # Affichage du compte à rebours
│   │   ├── MainContent.jsx        # Contenu principal (titre, CTA)
│   │   └── MuteButton.jsx         # Bouton contrôle son
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── useCountdown.js        # Hook pour le compte à rebours
│   │
│   ├── utils/               # Utilitaires et constantes
│   │   └── constants.js           # Configuration du festival
│   │
│   ├── styles/              # Fichiers CSS
│   │   └── App.css               # Styles et animations
│   │
│   ├── App.jsx              # Composant principal
│   ├── main.jsx             # Point d'entrée de l'app
│   └── index.css            # Styles globaux
│
├── index.html               # Fichier HTML principal
├── package.json             # Dépendances du projet
├── vite.config.js           # Configuration Vite
├── tailwind.config.js       # Configuration Tailwind
└── postcss.config.js        # Configuration PostCSS
```

## 🚀 Installation et Démarrage

### 1. Copier le projet
Copiez tous les fichiers dans votre dossier local.

### 2. Installer les dépendances
```bash
cd makua-festival
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### 4. Build pour production
```bash
npm run build
```

## 🎨 Composants

### VideoBackground
- Gère l'affichage de la vidéo de fond
- Applique un overlay sombre

### Header
- Logo MAKUA
- Menu de navigation
- Sélecteur de langue
- Boutons Sign Up / Log In

### Countdown
- Compte à rebours en temps réel
- Format: Jours, Heures, Minutes, Secondes
- Mise à jour automatique chaque seconde

### MainContent
- Titre et dates du festival
- Localisation
- Boutons CTA (Pass & Accommodation)
- Intègre le composant Countdown

### MuteButton
- Contrôle du son de la vidéo
- Icône dynamique (muet/son activé)

## 🔧 Personnalisation

### Changer la vidéo de fond
Modifier dans `src/utils/constants.js`:
```javascript
export const VIDEO_CONFIG = {
  src: 'VOTRE_URL_VIDEO.mp4',
  type: 'video/mp4'
};
```

### Modifier les dates du festival
Dans `src/utils/constants.js`:
```javascript
export const FESTIVAL_CONFIG = {
  dates: {
    start: '29 Octobre',           // ← Date de début
    end: '1 Novembre 2026',        // ← Date de fin
    target: new Date('2026-10-29T00:00:00').getTime() // ← Date cible pour le compte à rebours
  }
};
```

### Changer la localisation
Dans `src/utils/constants.js`:
```javascript
export const FESTIVAL_CONFIG = {
  location: {
    city: 'Toamasina',      // ← Ville
    region: 'Tamatave',     // ← Région
    country: 'MADAGASCAR'   // ← Pays
  }
};
```

### Changer le nom du festival
Dans `src/utils/constants.js`:
```javascript
export const FESTIVAL_CONFIG = {
  name: 'VOTRE_NOM', // Actuellement: MAKUA
  // ...
};
```

### Personnaliser les couleurs
Les couleurs sont dans les classes Tailwind. Exemple dans `MainContent.jsx`:
```javascript
// Bouton gradient
className="... bg-gradient-to-r from-pink-500 to-purple-600 ..."
```

## 📦 Dépendances

- **React 18.2** - Bibliothèque UI
- **Vite 5** - Build tool et dev server
- **Tailwind CSS 3** - Framework CSS utility-first
- **Lucide React** - Bibliothèque d'icônes
- **PostCSS & Autoprefixer** - Processing CSS

## ✨ Fonctionnalités

✅ Fond vidéo en lecture automatique  
✅ Compte à rebours en temps réel  
✅ Design 100% responsive  
✅ Animations fluides  
✅ Contrôle du son vidéo  
✅ Interface moderne et épurée  
✅ Performance optimisée  

## 🎯 Navigation du Code

- **Points d'entrée**: `main.jsx` → `App.jsx`
- **Logique métier**: Hooks dans `/hooks`
- **Configuration**: Constantes dans `/utils`
- **UI**: Composants dans `/components`
- **Styles**: CSS dans `/styles` + Tailwind inline

## 💡 Conseils

1. **Performance**: La vidéo est en autoplay et muted par défaut pour éviter les blocages navigateur
2. **Responsive**: Testez sur mobile avec Chrome DevTools
3. **Custom Hook**: `useCountdown` peut être réutilisé pour d'autres projets
4. **Animations**: Les animations CSS sont dans `App.css`

## 📝 Licence

Projet libre d'utilisation pour votre festival MAKUA !

---

Créé avec ❤️ pour MAKUA Festival
