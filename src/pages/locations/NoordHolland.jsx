import React from 'react';
import LocationPage from './LocationPage';

export default function NoordHolland() {
    return (
        <LocationPage
            city="Podcast Studio Noord-Holland"
            intro="De professionele podcaststudio van Noord-Holland. Centraal gelegen in Purmerend, bereikbaar vanuit Hoorn, Alkmaar, Zaandam en Amsterdam Noord."
            sections={[
                {
                    title: 'De podcaststudio van Noord-Holland',
                    text: 'Studio H20 in Purmerend bedient de hele regio Noord-Holland. Broadcast kwaliteit, volledig ontzorgd, centrale ligging — voor iedereen bereikbaar zonder de stad in te hoeven.',
                    items: [
                        'Hoorn — ~25 min via A7',
                        'Alkmaar — ~30 min via A9/A7',
                        'Zaandam — ~20 min via N247',
                        'Amsterdam Noord — ~20 min via A10/N247',
                    ],
                },
                {
                    title: 'Wat maakt Studio H20 anders?',
                    text: 'De meeste studio\'s verhuren een ruimte. Wij leveren een complete productie. Onze technicus/regisseur is altijd inbegrepen — geen extra kosten, geen verrassingen.',
                    items: [
                        '4-camera live schakeling — direct een broadcast-ready aflevering',
                        'Eigen technicus & regisseur bij elk pakket inbegrepen',
                        'Flexibel set design met ruimte voor branding',
                        'Gratis parkeren voor alle bezoekers',
                        'Add-ons beschikbaar: post-productie, social snippets, format-begeleiding',
                    ],
                },
                {
                    title: 'Bereikbaar vanuit heel Noord-Holland',
                    text: 'Purmerend ligt centraal in Noord-Holland met directe toegang via meerdere snelwegen. Altijd gratis en ruim parkeren direct bij de studio.',
                },
            ]}
        />
    );
}
