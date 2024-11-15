import type { HttpContext } from '@adonisjs/core/http';
import { sign } from 'jsonwebtoken';
import User from '#models/user';
import vine from '@vinejs/vine';

export default class LoginController {
    async Login({ request, response }: HttpContext) {
        const schema = vine.object({
            email: vine.string().email(),
            password: vine.string().minLength(8).maxLength(32),
        });

        try {
            const compiledSchema = vine.compile(schema);
            const validatedData = await compiledSchema.validate(request.all());

            const user = await User.query().where('email', validatedData.email).first();
            if (!user || !(await user.verifyPassword(validatedData.password))) {
                return response.status(400).json({ message: 'Credenciales inválidas' });
            }

            if (!process.env.JWT_SECRET_KEY) {
                console.error('JWT_SECRET_KEY no está definida');
                return response.status(500).json({ message: 'Error interno del servidor' });
            }

            const token = sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });
            return response.json({ token });
        } catch (error) {
            if (error.messages) {
                return response.status(400).json({ message: error.messages });
            }
            console.error(error);
            return response.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}
