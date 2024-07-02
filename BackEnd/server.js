import express from 'exress';
import { connectDataBase } from './database/db';



const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());




const startApp = async () => {
    try {

        await connectDataBase(process.env.SEED ? true : false);
        app.listen(PORT, () => {
            console.log(`Server is now listenting to PORT ${PORT}`);

        })
    } catch (e) {
        console.error('Failed to start application!');
        console.error(e);
    };
};