import { prisma } from "@/database/db";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";
import EmailTemplate from '@/app/components/EmailTemplate'
import nodemailer from 'nodemailer';
import { ReactElement } from "react";

export async function POST(request: NextRequest) {
    
    try {
        const { firstName, lastName, email, phone, numPeople, arrivalTime, reservationDate } = await request.json();
        // console.log(email);
        
        const existingReservation = await prisma.reservation.findUnique({
            where: { email: email }
        });

        if (existingReservation) {
            console.log('dkfkflklfklf');
            
            return NextResponse.json({ error: "Cet email est déjà utilisé pour une réservation." }, { status: 400 });
        }

        const reservation = await prisma.reservation.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                numPeople,
                arrivalTime,
                reservationDate: new Date(reservationDate),
            },
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const emailHtml = await render(EmailTemplate({
            firstName,
            lastName,
            email,
            phone,
            numPeople,
            arrivalTime,
            reservationDate,
        }) as ReactElement)

        // Envoi du mail
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Nouvelle Réservation',
            html: emailHtml,
        });

        return NextResponse.json({ message: 'Réservation effectuée avec succès !', reservation }, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création de la réservation:', error);
        return NextResponse.json({ error: 'Erreur lors de la création de la réservation' }, { status: 500 });
    }
}