'use client'
import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

type ReservationFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    numPeople: number;
    arrivalTime: string;
    reservationDate: string;
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Le prénom est requis"),
    lastName: Yup.string().required("Le nom est requis"),
    email: Yup.string().email("Email invalide").required("L'email est requis"),
    phone: Yup.string().required("Le numéro de téléphone est requis"),
    numPeople: Yup.number()
        .positive("Doit être un nombre positif")
        .integer("Doit être un entier")
        .required("Le nombre de personnes est requis"),
    arrivalTime: Yup.string().required("L'heure d'arrivée est requise"),
    reservationDate: Yup.string().required("La date de réservation est requise"),
});

export default function ReservationForm() {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReservationFormValues>({
        resolver: yupResolver(validationSchema),
    })
    

    const onSubmit = async (data: ReservationFormValues) => {
        setisLoading(true);
        // return console.log('xxxxxxxxx', JSON.stringify(data));
        
        try {
            const response = await fetch("/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            // Vérification de la réponse
            const text = await response.text(); 
            // console.log("Raw response:", text);
    
            if (!text) {
                throw new Error("Réponse vide reçue du serveur.");
            }
    
            const result = JSON.parse(text);
    
            if (response.ok) {
                toast.success('Réservation effectuée avec succès !');
                reset();
            } else {
                toast.error(result?.error || "Une erreur est survenue. Veuillez réessayer.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setisLoading(false);
        }
    };
    

    return (
        <div className="flex-1 h-full px-4 flex justify-center items-center">
            <div className="bg-white py-10 rounded-xl flex flex-col justify-center shadow-2xl px-8 max-w-[768px]">
                <div className="mb-6 flex flex-col justify-center items-center">
                    <h1 className="text-xl px-2 font-semibold text-center">
                        {`Veuillez remplir le formulaire pour soumettre votre réservation.`}
                    </h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2">
                        {/* Champ firstName */}
                        <div className='lg:w-[300px]'>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Prenoms
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                {...register("firstName", { required: true })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Bernadin"
                            />
                            {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}

                        </div>
                        {/* Champ lastName */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Nom
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                {...register("lastName", { required: true })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Kele"
                            />
                            {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}

                        </div>
                        {/* Champ Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Adresse e-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", { required: true })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="exemple@domaine.com"
                            />
                            {errors.email && <span className="text-red-500 text-xs">Ce champ est requis</span>}

                        </div>
                        {/* Champ Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                {...register("phone", { required: true })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder=""
                            />
                            {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}

                        </div>
                        {/* Champ numPeople */}
                        <div>
                            <label htmlFor="numPeople" className="block text-sm font-medium text-gray-700">
                                Nombre de personnes:
                            </label>
                            <input
                                type="number"
                                id="numPeople"
                                {...register("numPeople", { required: true})}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder=""
                            />
                            {errors.numPeople && <span className="text-red-500 text-xs">{errors.numPeople.message}</span>}

                        </div>
                        {/* Champ reservationDate  */}
                        <div>
                            <label htmlFor="reservationDate" className="block text-sm font-medium text-gray-700">
                                Date de réservation:
                            </label>
                            <input
                                type="date"
                                id="reservationDate"
                                {...register("reservationDate", { required: true })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder=""
                            />
                            {errors.reservationDate && <span className="text-red-500 text-xs">{errors.reservationDate.message}</span>}

                        </div>
                        {/* Champ arrivalTime  */}
                        <div>
                            <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700">
                                Date de réservation:
                            </label>
                            <select {...register('arrivalTime')} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                <option value="">Sélectionnez une heure</option>
                                {['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map((time) => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                            {errors.arrivalTime && <span className="text-red-500 text-xs">{errors.arrivalTime.message}</span>}

                        </div>
                    </div>


                    {/* Bouton de connexion */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <ClipLoader
                                loading={isLoading}
                                size={20}
                                color="#ffffff"
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            <span className='ml-2'>Réserver</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
