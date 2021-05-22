import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

type ToggleUnitProps = {
    units: string
    setUnits(units: {}): void
}
const ToggleUnit = ({ units, setUnits }: ToggleUnitProps) => {

    const handleUnits = (event: React.MouseEvent<HTMLElement>, newUnit: string | null) => {
        if (newUnit !== null) {
            setUnits(newUnit);
        }
    };

    return (
        <ToggleButtonGroup
            value={units}
            exclusive
            onChange={handleUnits}
            aria-label="units of measurement"
        >
            <ToggleButton value="metric" aria-label="metric">
                Metric: &deg;C, m/s
            </ToggleButton>
            <ToggleButton value="imperial" aria-label="imperial">
                Imperial: &deg;F, mph
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
export default ToggleUnit