import ReservationForm from "./components/ReservationForm";

export default function Home() {
  return (
    <div className="min-h-screen space-y-4 flex flex-col bg-[#F5F4F2] justify-center items-center">
      {/* Section avec l'image de fond */}
      <div 
        className="w-full h-72 flex justify-center p-4 items-center flex-col text-white gap-3 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cover02.jpg')" }}
      >
        <span className="text-sm">Plateforme de Reservation</span>
        <h1 className="font-bold text-4xl text-center lg:text-5xl">Restaurant Fast Food <span className="text-red-800">R&D</span></h1>
      </div>

      {/* Formulaire de réservation */}
      <ReservationForm />
    </div>
  );
}
