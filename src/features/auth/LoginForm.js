import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthService } from '../../services/AuthService';
import FormInput from '../../components/FormInput';

function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await AuthService.login(formData.email, formData.password);
            toast.success('Connexion réussie !');
            navigate('/integration-continue-exo-react/users');
        } catch (error) {
            toast.error(error.message || 'Erreur lors de la connexion');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Connexion
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full"
                />
                <FormInput
                    label="Mot de passe"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full"
                />
                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-lg text-white ${
                        !isLoading ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                </button>
            </form>

            <div className="mt-6 text-center">
                <Link
                    to="/integration-continue-exo-react"
                    className="text-blue-500 hover:text-blue-700 text-sm"
                >
                    Pas encore de compte ? Inscrivez-vous ici
                </Link>
            </div>
        </div>
    );
}

export default LoginForm;