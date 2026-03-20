import React from 'react';
import LocationPage from './LocationPage';

export default function Hoorn() {
    return (
        <LocationPage
            city="Podcast Studio Hoorn"
            travelTime="~25 min"
            travelRoute="A7"
            intro="Vanuit Hoorn ben je in 25 minuten bij Studio H20 in Purmerend. Dichterbij dan je denkt — broadcast kwaliteit, eigen technicus en gratis parkeren."
            sections={[
                {
                    title: 'Dichterbij dan je denkt',
                    text: 'Een professionele podcaststudio in de regio Hoorn? Via de A7 richting Purmerend rij je er zo. Geen files, ruim parkeren en direct aan de slag.',
                    items: [
                        '4-camera live schakeling',
                        'Eigen technicus & regisseur inbegrepen',
                        'Professioneel licht & geluid',
                        'Direct bruikbare HD aflevering',
                        'Gratis parkeren',
                    ],
                },
                {
                    title: 'Wat is inbegrepen?',
                    text: 'Bij elk pakket zit standaard het gebruik van de volledige studio, alle apparatuur én onze technicus/regisseur inbegrepen. Geen losse rekeningen achteraf.',
                },
                {
                    title: 'Bereikbaarheid vanuit Hoorn',
                    text: 'Neem de A7 richting Purmerend. Afrit Purmerend-Noord, dan richting centrum. Spinnekop 2 ligt direct aan de uitvalsweg met ruim gratis parkeren.',
                },
            ]}
        />
    );
}
