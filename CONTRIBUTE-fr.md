Contribuer à `a11y.css`
=======================

*PS*: Non, les bonnes pratiques `CSS` n’ont pas cours dans ce fichier puisque certains sélecteurs sont tout simplement immondes. Mais ce fichier n’est pas voué à être chargé sur d’autres machines que celles des intégrateurs en quête de qualité, comme moi :D.

## Ajouter une langue

`a11y.css` existe en français et en anglais : vous trouverez tous les fichiers dans le répertoire [css](https://github.com/ffoodd/a11y.css/tree/master/css). Si vous souhaitez contribuer en ajoutant une nouvelle langue, c’est très simple :

1. Ajoutez un fichier JSON de traduction dans le [dossier `locales`](https://github.com/ffoodd/a11y.css/blob/master/locales/) nommé selon votre langage (ex : `fr.json`).
2. Copiez [`sass/a11y-en.scss`](https://github.com/ffoodd/a11y.css/blob/master/sass/a11y-en.scss), rennommez-le en `a11y-<your-language>.scss` et modifiez la valeur passée à la fonction `require(..)` ;
3. Lancez `gulp sass` pour générer le nouveau fichier CSS.

Et voilà !

## Cas particuliers et problèmes connus

1. Les balises « auto-fermantes » n’autorisent pas la génération de contenu. Ainsi les erreurs ou alertes seront signalées, mais aucun message n’apparaitra au survol. Il sera en revanche consultable dans la plupart des inspecteurs de `DOM` : la limite est la création du pseudo-élément pour l’affichage (cf [la spécification](http://www.w3.org/TR/CSS2/generate.html#before-after-content). Voici la liste exhaustive des balises `HTML5` auto-fermantes :

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
 * `<textarea>`, `<select>`, `<svg>`, `<audio>`, `<video>` et `<iframe>` ne sont pas des balises auto-fermantes mais ne peuvent pas contenir de pseudo-éléments non plus, car ce sont des éléments remplacés. Je vous conseille la lecture de [Qu’est-ce qu’un élément remplacé ?](http://la-cascade.ghost.io/quest-ce-quun-element-remplace/), traduction en français sur La Cascade de [What The Heck Is A Replaced Element?](https://demosthenes.info/blog/461/What-The-Heck-Is-A-Replaced-Element#) écrit par @dudleystorey.

*L’issue #7 ouverte par @7studio a permis d’ajouter une astuce qui permettra d’afficher ces messages, à condition que la balise auto-fermante signalée dispose d’un élément adjacent qui ne soit pas auto-fermant.*

2. Les messages sont générés via un pseudo-élément en position fixe. Il faut cependant souligner un problème de *containing block* causé par un élément parent, si ce dernier se voit appliqué `transform`:
  * @see [La spéc W3C](http://www.w3.org/TR/css3-transforms/#transform-property)
  * @see [What no one told you about z-index](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/) [traduit en Français par @iamvdo](http://blog.iamvdo.me/post/41094013194/comprendre-z-index-et-les-contextes-dempilement).


## Automatisation

Parce qu’il faut bien se mettre à la page un jour, un fichier de configuration [Gulp](http://gulpjs.com/) a été ajouté.
Quelques tâches bien pratiques ont donc été prévues.

Si vous lancez `gulp` vous allez compiler les fichiers Sass et améliorer les CSS générés.

Vous pouvez aussi lancer `gulp docs`, qui va générer les documentations *via* SassDoc et Hologram, ou `gulp lints` qui va lancer le *linting* des fichiers scss et CSS.

Chacune de ces tâches est disponible séparément :
* `gulp sass`
* `gulp css`
* `gulp scss-lint`
* `gulp css-lint`
* `gulp sassdoc`
* `gulp hologram`

Et vous pouvez lancer une surveillance sur la compilation Sass et l’amélioration des CSS avec `gulp watch` — qui va aussi *linter* les fichiers scss et CSS après chaque compilation.

## Documentation

### Construire la SassDoc

Avec une installation globale SassDoc :

```sh
$ npm install sassdoc -g
$ sassdoc sass/ --dest docs/SassDoc/ --verbose --config configs/.sassdocrc
```

Avec une installation locale SassDoc :

```sh
$ npm install
$ node_modules/sassdoc/bin/sassdoc sass/ --dest docs/SassDoc/ --verbose --config configs/.sassdocrc
```

### Générer la documentation Hologram

C’est très facile. En ligne de commande, placez-vous dans le répertoire `a11y.css` et lancez `hologram -c configs/hologram_config.yml`.
Et voilà !

Pour en savoir plus sur Hologram, jetez un œil à [leur répertoire GitHub](https://github.com/trulia/hologram).


