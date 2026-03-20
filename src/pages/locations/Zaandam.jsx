import React from 'react';
import LocationPage from './LocationPage';

export default function Zaandam() {
    return (
        <LocationPage
            city="Podcast Studio Zaandam"
            travelTime="~20 min"
            travelRoute="N247"
            intro="Vanuit Zaandam ben je via de N247 in 20 minuten bij Studio H20. Professionele 4-camera opnames met eigen regisseur — direct een bruikbaar eindresultaat."
            sections={[
                {
                    title: 'Professionele studio vlak bij Zaandam',
                    text: 'Studio H20 in Purmerend is de dichtstbijzijnde professionele podcaststudio voor de regio Zaandam. 50m², flexibel set design en branding mogelijk.',
                    items: [
                        '4-camera live schakeling',
                        'Eigen technicus & regisseur inbegrepen',
                        'Flexibel set design met branding',
                        'Direct bruikbare HD aflevering',
                        'Gratis parkeren',
                    ],
                },
                {
                    title: 'Live opnemen, direct klaar',
                    text: 'Onze regisseur knipt live terwijl jullie opnemen. Na de sessie heb je een kant-en-klare HD aflevering zonder dat je zelf hoeft te monteren.',
                },
                {
                    title: 'Bereikbaarheid vanuit Zaandam',
                    text: 'Neem de N247 richting Purmerend. De route is rechttoe rechtaan en goed aangegeven. Gratis parkeren direct bij de studio.',
                },
            ]}
        />
    );
}
