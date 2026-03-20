import React from 'react';
import LocationPage from './LocationPage';

export default function AmsterdamNoord() {
    return (
        <LocationPage
            city="Podcast Studio Amsterdam Noord"
            travelTime="~20 min"
            travelRoute="A10/N247"
            intro="Vanuit Amsterdam Noord ben je via de A10 en N247 in 20 minuten bij Studio H20. Broadcast kwaliteit buiten de Amsterdamse drukte — met gratis parkeren."
            sections={[
                {
                    title: 'Buiten Amsterdam, broadcast kwaliteit',
                    text: 'Dezelfde professionele kwaliteit als de grote Amsterdamse studio\'s, maar zonder de parkeerkosten, de drukte en de hoge uurtarieven. Studio H20 levert meer voor minder.',
                    items: [
                        '4-camera live schakeling',
                        'Eigen technicus & regisseur inbegrepen',
                        'Professioneel licht & geluid',
                        'Direct bruikbare HD aflevering',
                        'Gratis parkeren — geen parkeerstress',
                    ],
                },
                {
                    title: 'Direct klaar na de opname',
                    text: 'Dankzij live camera-schakeling is je aflevering klaar zodra de opname stopt. Optioneel voegen we post-productie, social snippets of format-begeleiding toe.',
                },
                {
                    title: 'Bereikbaarheid vanuit Amsterdam Noord',
                    text: 'Via de A10 en de N247 rij je in circa 20 minuten naar Purmerend. Geen tunnel of drukke binnenstad — een rechte route met weinig files.',
                },
            ]}
        />
    );
}
