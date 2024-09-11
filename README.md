# 724 Events

## Description
L'application est le site d'une agence evenementielle.
## Pre-requis
- NodeJS  >= v16.14.1

## Installation
- `yarn install`

## Lancement de l'application
- `yarn start`

## Tests
- `yarn test`

## RD corrections des bugs annoncés et repérés

Modifications effectuées :

-	Logo : 
o	utilisation camelCase pour fontFamily, fontSize …

-	Select : 
o	onChange sans paramètre => ajout ‘newValue’

-	Events : 
o	refonte total du code permettant le filtrage et la pagination (PER_PAGE = 6 pour test)
o	découpage du filtrage en 2 partie (type et selon pagination)
o	ajout des conditions de filtrage par type
o	calcul de la pagination selon le nombre d’évènements filtrés par ‘type’
o	fermeture de la droplist si choix d’une catégorie
o	ajout de la description de l’image
o	ajout de l’attribut small = ‘false‘

-	Form
o	si l’envoi est un succès => ajout onSuccess = ‘true’ pour affichage message de confirmation après envoi
expect(onSuccess).toHaveBeenCalled();
o	reconfiguration des éléments pour déplacement clavier et mode mobile
o	correction du texte ‘personnel’ -> ‘Personnel’

-	Menu
o	ajout de la fonction ‘onClick’ et lien d’accès sur la navigation sur la page

-	Slider
o	tri des éléments selon le plus récent au plus ancien
o	découpage de la fonction nextCard car le nombre de ‘slide’ était erronée car l’index commence à 0
o	suppression des <> </ > qui encapsulaient 2 éléments différents
o	pour le map radioIdx ajout de la props ‘event’ 
o	correction de la key=event.id par event.date (car les élts event.focus n’a pas d’index)
o	correction checked ‘idx’ remplacé par ‘index’ pour mise en évidence ‘slide’ en cours

-	Date
o	Correction de ‘getMonth’ : 
§	la fonction ‘date.getMonth’ renvoi 0 = janvier 1= février … 11 = décembre

-	Home
o	récupération de l’évènement le plus ancien dans l’objet ‘last’
o	ajout des ‘id’ pour navigation dans la page selon le ‘nav’ du ‘header’
o	correction des textes ‘
§	‘événements’ -> ‘évènement(s) … évènementielle …’ (plus actuel)
§	‘Personel’ -> ‘Personnel’
§	‘une équipe d’experts dédiée à l’organisation’ et non ‘une équipe d’experts dédiés à ogranisation …’
§	 est un succès => ajout onSuccess = ‘true’ pour affichage message de confirmation après envoi
o	ajout de ‘eventCard’ du dernier évènement selon objet ‘last’ et de sa modal (idem galerie) 

-	Style
o	EventCard (style)
§	Modification de l’aspect de l’image si mode ‘small’ pour affichage du milieu de l’image
o	Mode responsive : problème affichage en mobile

