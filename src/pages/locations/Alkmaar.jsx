import React from 'react';
import LocationPage from './LocationPage';

export default function Alkmaar() {
    return (
        <LocationPage
            city="Podcast Studio Alkmaar"
            travelTime="~30 min"
            travelRoute="A9/A7"
            intro="Vanuit Alkmaar rij je via de A9 en A7 in circa 30 minuten naar Studio H20 in Purmerend. Noord-Holland heeft nu een volwaardige broadcast podcaststudio."
            sections={[
                {
                    title: 'Noord-Holland heeft een professionele podcaststudio',
                    text: 'Geen grote stadsdruk, geen parkeerproblemen. Studio H20 in Purmerend is de premier podcaststudio voor de hele regio Noord-Holland — inclusief Alkmaar.',
                    items: [
                        '4-camera live schakeling',
                        'Eigen technicus & regisseur inbegrepen',
                        'Broadcast geluid & beeld',
                        'Direct bruikbare HD aflevering',
                        'Gratis parkeren',
                    ],
                },
                {
                    title: 'Volledig ontzorgd',
                    text: 'Van voorbereiding tot eindproduct — wij regelen de technische kant volledig. Jij focust op het gesprek, wij op de productie.',
                },
                {
                    title: 'Bereikbaarheid vanuit Alkmaar',
                    text: 'Neem de A9 richting Amsterdam, vervolgens de A7 richting Purmerend. Totale reistijd circa 30 minuten. Ruim gratis parkeren aanwezig.',
                },
            ]}
        />
    );
}
