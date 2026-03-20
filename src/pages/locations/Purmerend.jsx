import React from 'react';
import LocationPage from './LocationPage';

export default function Purmerend() {
    return (
        <LocationPage
            city="Podcast Studio Purmerend"
            intro="Studio H20 zit in het hart van Purmerend. Professionele 4-camera live opnames, eigen technicus inbegrepen en gratis parkeren voor de deur."
            sections={[
                {
                    title: 'De Studio',
                    text: 'Een volledig uitgeruste podcaststudio van 50m² met flexibel set design, ruimte voor branding en broadcast-kwaliteit geluid en beeld. Geen insteltijd, geen technische rompslomp — jij stuurt het gesprek, wij de rest.',
                    items: [
                        '4-camera live schakeling',
                        'Eigen technicus & regisseur inbegrepen',
                        'Professioneel licht & geluid',
                        'Direct bruikbare HD aflevering',
                        'Gratis parkeren',
                    ],
                },
                {
                    title: 'Hoe het werkt',
                    text: 'Je reserveert een tijdslot, we bespreken de technische eisen en camerahoeken vooraf. Op de dag zelf staat de set klaar, stuurt onze regisseur live alle camera\'s en ga je naar huis met een kant-en-klaar eindproduct.',
                },
                {
                    title: 'Bereikbaarheid',
                    text: 'Studio H20 is gevestigd op Spinnekop 2, 1444 GN Purmerend. Goed bereikbaar via de A7 en ruim voldoende gratis parkeerplaatsen direct bij de studio.',
                },
            ]}
        />
    );
}
