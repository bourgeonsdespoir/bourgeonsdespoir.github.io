# 🌱 Bourgeons d'Espoir — Site Web

Site web statique pour l'association étudiante **Bourgeons d'Espoir** (Montpellier).

## 📁 Structure du projet

```
bourgeons-despoir/
├── index.html          ← Accueil (focus Etud'Iftar)
├── about.html           ← Qui sommes-nous
├── actions.html         ← Nos actions
├── projects.html        ← Nos projets
├── support.html         ← Nous soutenir
├── contact.html         ← Contact
├── css/
│   └── style.css        ← Styles du site
├── js/
│   └── script.js        ← JavaScript (dates, menu, animations)
├── images/
│   └── logo.jpg         ← Logo + images à ajouter
└── README.md            ← Ce fichier
```

## 🖼️ Images à ajouter

**⚠️ IMPORTANT** : Téléchargez et placez ces images dans le dossier `images/` :

### Logo (obligatoire)
1. Téléchargez votre logo depuis Instagram (photo de profil @bourgeonsdespoir)
2. Renommez-le **`logo.jpg`**
3. Placez-le dans `images/logo.jpg`

### Image Hero (recommandé)
1. Sauvegardez la photo du Restaurant L'Oasis depuis Google Maps
2. Renommez-la **`hero-oasis.jpg`**
3. Placez-la dans `images/hero-oasis.jpg`

| Fichier | Utilisation |
|---------|-------------|
| `logo.jpg` | Logo Bourgeons d'Espoir (circulaire) — **obligatoire** |
| `hero-oasis.jpg` | Fond du hero sur la page d'accueil — **recommandé** |

## 🚀 Déploiement sur Netlify

### Option 1 : Déploiement manuel (le plus simple)

1. Allez sur [netlify.com](https://www.netlify.com/) et créez un compte gratuit
2. Depuis le dashboard, cliquez sur **"Add new site"** → **"Deploy manually"**
3. **Glissez-déposez** le dossier `bourgeons-despoir/` complet dans la zone indiquée
4. Netlify génère automatiquement une URL (ex: `random-name.netlify.app`)
5. Cliquez sur **"Site settings"** → **"Change site name"** pour personnaliser l'URL

### Option 2 : Via GitHub (recommandé pour les mises à jour)

1. Créez un repository GitHub et poussez le code
2. Sur Netlify : **"Add new site"** → **"Import an existing project"**
3. Connectez votre compte GitHub et sélectionnez le repo
4. Laissez les paramètres par défaut (pas de build command nécessaire)
5. Cliquez **"Deploy site"**
6. À chaque `git push`, le site se met à jour automatiquement !

### Nom de domaine personnalisé (optionnel)

1. Dans Netlify → **"Domain management"** → **"Add custom domain"**
2. Suivez les instructions pour configurer votre DNS

## ⚙️ Fonctionnalités

- ✅ **Système de date automatique** : change à 17h (aujourd'hui → demain)
- ✅ **Menu hamburger** responsive mobile/desktop
- ✅ **Animations au scroll** (apparition progressive)
- ✅ **Barre de progression** de la cagnotte
- ✅ **Formulaire de contact** (front-end uniquement)
- ✅ **Bouton don flottant** sur mobile
- ✅ **Design responsive** mobile-first

## 🎨 Charte graphique

- **Vert principal :** `#00A651`
- **Beige/crème :** `#F5F3D7`
- **Typographies :** Poppins (titres) + Nunito (texte)

## 📝 Modifier le contenu

Les textes sont directement dans les fichiers HTML. Pour modifier :

1. Ouvrez le fichier HTML concerné dans un éditeur de texte
2. Modifiez le texte entre les balises HTML
3. Sauvegardez et redéployez

### Modifier le montant de la cagnotte

Dans `index.html`, cherchez `513,39 €` et remplacez par le nouveau montant.
Mettez aussi à jour `data-width="51"` (pourcentage de la barre de progression).

## 📞 Liens importants

- **Instagram :** [@bourgeonsdespoir](https://www.instagram.com/bourgeonsdespoir)
- **Cagnotte Leetchi :** [Etud'Iftar 2026](https://www.leetchi.com/fr/c/etudiftar-2026-1492076)
- **Restaurant L'Oasis :** [Google Maps](https://www.google.fr/maps/place/L'oasis+Restaurant/@43.6075129,3.8805238)

---

© 2026 Bourgeons d'Espoir — La jeunesse pour la jeunesse 🌱
