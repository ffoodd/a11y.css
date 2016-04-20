Customiser `a11y.css`
=====================

## Compiler une version nivelée

Vous pouvez adapter le fichier de sortie au niveau d’erreur que vous souhaitez. Vous n’avez qu’à modifier le seul paramètre du mixin `set-minimum-level`. Les niveaux sont cumulatifs, et sont fidèles au nommage des thèmes :
* `error`: seulement les erreurs;
* `warning`: les alertes et erreurs ;
* `obsolete`: les trucs obsolètes, les alertes et les erreurs ;
* `advice`: la totale.

Nous partons du principe que si vous êtes intéressés par les conseils, vous le serez aussi par les alertes et les erreurs.

Merci à [@HugoGiraudel](https://twitter.com/HugoGiraudel) dans l’issue [#69](https://github.com/ffoodd/a11y.css/issues/69).

## Désactiver des tests

Il est possible de désactiver des tests au cas par cas si vous compilez votre propre version de `a11y.css` via le mixin `disable-tests(..)`.

Par exemple, si vous voulez désactiver les erreurs à propos des mauvais `tabindex` et du `href` manquant, voici comment faire :

```scss
@include disable-tests('error:tab-order', 'error:no-href');
```

Vous pouvez trouver le nom exact des clés dans les fichiers JSON du dossier `locales/`.

Merci à [@HugoGiraudel](https://twitter.com/HugoGiraudel) dans l’issue [#69](https://github.com/ffoodd/a11y.css/issues/113).

## Code couleur

Concrètement, les éléments en erreur, en alerte, obsolètes ou pouvant être améliorés seront cernés d’un contour de quatre pixels colorés:
* en rouge pour les erreurs;
* en jaune pour les alertes;
* en bleu pour les élements & attributs obsolètes;
* en vert les suggestions d’améliorations.

Ces couleurs sont bien évidemment personnalisables, *via* [le fichier de configuration](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L333).

## Gestion des sélecteurs

Étant donné la longue liste de sélecteurs à tester, je les ai « externalisés » dans des fichiers partiels, qui étendent les placeholders dans le fichier principal.

Ça n’est pas forcément une bonne solution, mais j’ai préféré la facilité de lecture et de maintenance de chaque degré de gravité à l’homogénéité du résultat : ce fichier n’est — encore une fois — destiné qu’aux phases de développement. Ses performances n’ont donc pas d’intérêt, tout comme sa compatibilité navigateur.

### Annuler un sélecteur

Quand le sélecteur de négation ne permet pas un ciblage suffisamment précis, vous pouvez ajouter un second sélecteur après le premier qui étendra le placeholder `%a11y-reset` et annulera (au mieux) le premier sélecteur dans certains cas. Malheureusement certains styles de la page originelle seront malgré tout écrasés.

```scss
button:not([type]):not([form]):not([formaction]):not([formtarget]) {
  @include error('not-form-button');
}

form button:not([type]):not([form]):not([formaction]):not([formtarget]) {
  @extend %a11y-reset;
}
```

### Étendre un sélecteur pour cibler les balises auto-fermantes et éléments remplacés

Les sélecteurs génériques comme `[class]` peuvent également cibler des éléments remplacés et des balises auto-fermantes (voir la section « Cas particuliers et problèmes connus »). Certains sélecteurs sont étendus grâce au mixin `@void-tags`, qui reprend le sélecteur en ciblant plus particulièrement les éléments incongrus, et répète le message en y ajoutant l’argument `$self-closing: true`.

```scss
:not(img):not(object):not(embed):not(svg):not(canvas)[width],
:not(img):not(object):not(embed):not(svg):not(canvas)[height] {
  @include error('dimensions');

  @include void-tags {
    @include error('dimensions', $self-closing: true);
  }
}
```

### Sélecteur en quarantaine

Quand un sélecteur n’est pas supporté par certains navigateurs, il est possible de le mettre en quarantaine afin qu’il n’invalide pas les autres sélecteurs.

Activez simplement l’argument booléen `$quarantine: true`. Vous devez spécifier `$self-closing` avant, même si celui vaut `false`.

```scss
a:empty[title=""],
a:empty[aria-label=""],
a:empty[aria-labelledby=""],
a:empty:not([title]):not([aria-label]):not([aria-labelledby]) {
  @include error('empty-link');
}

a:blank[title=""],
a:blank[aria-label=""],
a:blank[aria-labelledby=""],
a:blank:not([title]):not([aria-label]):not([aria-labelledby]) {
  @include error('empty-link', $self-closing: false, $quarantine: true);
}

a:-moz-only-whitespace[title=""],
a:-moz-only-whitespace[aria-label=""],
a:-moz-only-whitespace[aria-labelledby=""],
a:-moz-only-whitespace:not([title]):not([aria-label]):not([aria-labelledby]) {
  @include error('empty-link', $self-closing: false, $quarantine: true);
}
```

### Customiser des messages

Chaque test dispose de son propre message, afin d’informer et guider au maximum l’intégrateur en quête d’amélioration. Ils sont eux aussi dans des fichiers partiels, pour en faciliter la lecture et la rédaction. Une personnalisation sera bien plus simple de cette façon (tout le monde n’aimera mes touches d’humour ;-) ).

Il est possible d’utiliser la fonction CSS `attr()` dans les messages afin d'afficher la valeur réelle d’un attribut.

Voici un exemple dans `_variables.scss` :

```scss
'duplicate-roles': (
    'fr': 'Le rôle ARIA attr(role) devrait être uniques, mais celui-ci est le deuxième dans la page !',
    'en': 'ARIA role attr(role) should be unique, but this one is the second!'
),
```
