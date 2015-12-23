Customiser a11y.css
===================

## Compiler une version nivelée

Vous pouvez adapter le fichier de sortie au niveau d’erreur que vous souhaitez. Vous n’avez qu’à modifier le seul paramètre du mixin `set-minimum-level`. Les niveaux sont cumulatifs, et sont fidèles au nommage des thèmes :
* `error`: seulement les erreurs;
* `warning`: les alertes et erreurs ;
* `obsolete`: les trucs obsolètes, les alertes et les erreurs ;
* `advice`: la totale.

Nous partons du principe que si vous êtes intéressés par les conseils, vous le serez aussi par les alertes et les erreurs.

Merci à [@HugoGiraudel](https://twitter.com/HugoGiraudel) dans l’issue [#69](https://github.com/ffoodd/a11y.css/issues/69).

## Désactiver des tests

Il est possible de désactiver des tests au cas par cas si vous compilez votre propre version de `a11y.css`. Utilisez les mixins suivants :

* `disable-errors($keys...)`
* `disable-advices($keys...)`
* `disable-warnings($keys...)`
* `disable-obsoletes($keys...)`

Par exemple, si vous voulez désactiver les erreurs à propos des mauvais `tabindex` et du `href` manquant, voici comment faire :

```scss
@include disable-errors("tab-order, no-href");
```

Merci à [@HugoGiraudel](https://twitter.com/HugoGiraudel) dans l’issue [#69](https://github.com/ffoodd/a11y.css/issues/113).

## Code couleur

Concrètement, les éléments en erreur, en alerte, obsolètes ou pouvant être améliorés seront cernés d’un contour de quatre pixels colorés:
* en rouge pour les erreurs;
* en jaune pour les alertes;
* en bleu pour les élements & attributs obsolètes;
* en vert les suggestions d’améliorations.

Ces couleurs sont bien évidemment personnalisables. Au survol des éléments ainsi marqués, un bandeau apparaitra en haut de votre navigateur avec une petite formule vous précisant le problème, et un indice sous forme de boutade (tentative plus ou moins réussie de faire un peu de pédagogie en passant).

## Gestion des sélecteurs

Étant donné la longue liste de sélecteurs à tester, je les ai « externalisés » dans des fichiers partiels, qui étendent les placeholders dans le fichier principal.

Ça n’est pas forcément une bonne solution, mais j’ai préféré la facilité de lecture et de maintenance de chaque degré de gravité à l’homogénéité du résultat : ce fichier n’est — encore une fois — destiné qu’aux phases de développement. Ses performances n’ont donc pas d’intérêt, tout comme sa compatibilité navigateur.

### Annuler un sélecteur

Quand le sélecteur de négation ne permet pas un ciblage suffisamment précis, vous pouvez ajouter un second sélecteur après le premier qui étendra le placeholder `%a11y-reset` et annulera (au mieux) le premier sélecteur dans certains cas. Malheureusement certains styles de la page originelle seront malgré tout écrasés.

### Étendre un sélecteur pour cibler les balises auto-fermantes et éléments remplacés

Les sélecteurs génériques comme `[class]` peuvent également cibler des éléments remplacés et des balises auto-fermantes (voir la section « Cas particuliers et problèmes connus »). Certains sélecteurs sont étendus grâce au mixin `@void-tags`, qui reprend le sélecteur en ciblant plus particulièrement les éléments incongrus, et répète le message en y ajoutant l’argument `$self-closing: true`.

### Sélecteur en quarantaine

Quand un sélecteur n’est pas supporté par certains navigateurs, il est possible de le mettre en quarantaine afin qu’il n’invalide pas les autres sélecteurs.

Activez simplement l’argument booléen `$quarantine: true`.

### Customiser des messages

Chaque test dispose de son propre message, afin d’informer et guider au maximum l’intégrateur en quête d’amélioration. Ils sont eux aussi dans des fichiers partiels, pour en faciliter la lecture et la rédaction. Une personnalisation sera bien plus simple de cette façon (tout le monde n’aimera mes touches d’humour ;-) ).

Il est possible d’utiliser la fonction CSS `attr()` dans les messages afin d'afficher la valeur réelle d’un attribut.
