# FrameworkAnimationJS
Framework d’animation en Javascript basé sur p5.js, à but pédagogique

## Utilisation

Le framework est contenu dans le dossier `js/AnimationFramework`. Pour l'utiliser, copier ce dossier dans un projet et inclure le fichier `AnimationFramework/animation_controller.js` dans chaque page HTML contenant une animation.

    <script src="AnimationFramework/animation_controller.js"</script>

Ensuite, il faut inclure les autres fichiers du framework :

    <script>
        include_animation_files("AnimationFramework/");
    </script>
    
Enfin, pour charger une animation contenue dans un fichier XML, il faut spécifier l'emplacement de ce fichier, l'id de la balise servant de canevas, et les dimensions de ce dernier :

    <script>
        load_animation("animation.xml", "anim1", 1600, 900); // fichier, id du canevas, largeur, hauteur
    </script>

