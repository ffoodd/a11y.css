Contribuer à a11y.css
=====================

*PS*: Non, les bonnes pratiques `CSS` n’ont pas cours dans ce fichier puisque certains sélecteurs sont tout simplement immondes. Mais ce fichier n’est pas voué à être chargé sur d’autres machines que celles des intégrateurs en quête de qualité, comme moi :D.

## Ajouter une langue

a11y.css existe en français et en anglais : vous trouverez tous les fichiers dans le répertoire [css](https://github.com/ffoodd/a11y.css/tree/master/css). Si vous souhaitez contribuer en ajoutant une nouvelle langue, c’est très simple :

1. Ajoutez le nom de la langue dans [cette liste](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_mixins.scss#L10) ;
2. Copiez [`_a11y-en.scss`](https://github.com/ffoodd/a11y.css/blob/master/sass/a11y-en.scss), rennommez-le en `_a11y-<your-language>.scss` et modifiez la valeur passée au mixin `set-locale` ;
3. Mettez à jour [cette map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L10) avec vos traductions ;
4. Mettez à jour [cette map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L241) pour traduire le nom des thèmes ;
5. Lancez `gulp sass` ou `sass --update sass:css --style=compressed` pour générer les nouveaux fichiers CSS.

Et voilà !

## Cas particuliers et problèmes connus

1. Les balises « auto-fermantes » n’autorisent pas la génération de contenu. Ainsi les erreurs ou alertes seront marquées, mais aucun message n’apparaitra au survol. Il sera en revanche consultable dans la plupart des inspecteurs de `DOM` : la limite est la création du pseudo-élément pour l’affichage (cf [la spécification](http://www.w3.org/TR/CSS2/generate.html#before-after-content). Voici la liste exhaustive des balises `HTML5` auto-fermantes :

 * `<area />`
 * `<base />`
 * `<br />`
 * `<col />`
 * `<command />`
 * `<embed />`
 * `<hr />`
 * `<img />`
 * `<input />`
 * `<keygen />`
 * `<link />`
 * `<meta />`
 * `<param />`
 * `<source />`
 * `<track />`
 * `<wbr />`
 * `<textarea>`, `<select>`, `<svg>`, `<audio>`, `<video>`, `<track>` et `<iframe>` ne sont pas des balises auto-fermantes mais ne peuvent pas contenir de pseudo-éléments non plus, car ce sont des éléments remplacés. Je vous conseille la lecture de [Qu’est-ce qu’un élément remplacé ?](http://la-cascade.ghost.io/quest-ce-quun-element-remplace/), traduction en français sur La Cascade de [What The Heck Is A Replaced Element?](https://demosthenes.info/blog/461/What-The-Heck-Is-A-Replaced-Element#) écrit par @dudleystorey.

*L’issue #7 ouverte par @7studio a permis d’ajouter une astuce qui permettra d’afficher ces messages, à condition que la balise auto-fermante signalée dispose d’un élément adjacent qui ne soit pas auto-fermant.*

2. Les messages sont générés via un pseudo-élément en position fixe. Il faut cependant souligner un problème de *containing block* causé par un élément parent, si ce dernier se voit appliqué `transform`:
  * @see [La spéc W3C](http://www.w3.org/TR/css3-transforms/#transform-property)
  * @see [What no one told you about z-index](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/) [traduit en Français par @iamvdo](http://blog.iamvdo.me/post/41094013194/comprendre-z-index-et-les-contextes-dempilement).

3. De même, les tests sur les éléments contenus dans le `<head>` posent un souci pour l’affichage du message.

 *Dans l’issue [#66](https://github.com/ffoodd/a11y.css/issues/66) ouverte par [@7studio](https://twitter.com/7studio) (de nouveau), une solution a été aportée grâce à [une idée](https://mathiasbynens.be/notes/css-hidden-elements) de [Mathias Bynens](https://twitter.com/mathias).

4. Pour éviter les cas dans lesquels le contour pourrait être masqué, la propriété [outline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset "Définition sur le MDN") est utilisée afin d’afficher le contour à l’intérieur de l’élément marqué. Amélioration suggérée par @7studio dans l’issue #4.

## Automatisation

Parce qu’il faut bien se mettre à la page un jour, un fichier de configuration [Gulp](http://gulpjs.com/) a été ajouté.
Quelques tâches bien pratiques ont donc été prévues.

Si vous lancez `gulp` — qui par défaut joue `gulp build` — vous allez compiler les fichiers Sass et
(en incluant les *sourcemaps*) optimiser les CSS générés.

Vous pouvez aussi lancer `gulp docs`, qui va générer les documentations *via* SassDoc et Hologram.

Chacune de ses tâches est disponible séparément :
* `gulp sass`
* `gulp minify`
* `gulp sassdoc`
* `gulp hologram`

Et vous pouvez lancer une surveillance sur la compilation Sass et la minification des CSS avec `gulp watch`.

## Documentation

### Construire la SassDoc

Avec une installation globale SassDoc :

```sh
$ npm install sassdoc -g
$ sassdoc sass/ --dest docs/ --verbose --config .sassdocrc
```

Avec une installation locale SassDoc :

```sh
$ npm install
$ node_modules/sassdoc/bin/sassdoc sass/ --dest docs/ --verbose --config .sassdocrc
```

### Générer la documentation Hologram

C’est très facile. En ligne de commande, placez-vous dans le répertoire `a11y.css` et lancez `hologram`.
Et voilà !

Pour en savoir plus sur Hologram, jetez un œil à [leur répertoire GitHub](https://github.com/trulia/hologram).

## Architecture technique
### Compteurs

Désormais des compteurs `CSS` ont incrémentés par chaque erreur, et les résultats sont affichés dans le `body::after`. C’est donc du faux-contenu, son intérêt est purement visuel afin de simplement indiquer au développeur l’étendue du chantier qui l’attend :) .

*À noter :* ce nouveau compteur permet d’obtenir des indications sur l’éventuelle présence de messages incriminant les balises du `<head>`. Ils n’ont toujours pas d’affichage mais ils sont désormais mentionnés dans ce compteur qu’ils incrémentent bien gentimment.

