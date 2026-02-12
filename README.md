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