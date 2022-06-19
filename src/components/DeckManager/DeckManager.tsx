import { ReactElement } from 'react'
import Card from '../Card';
  
function DeckManager(): ReactElement {
    return (    
        <div>
            <Card />
            <Card />
        </div>
    );
}

export default DeckManager;