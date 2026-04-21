import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VEHICLE_KEY = "rider:vehicleLastEdit";

export const getVehicleLastEdit = (): number | null => {
  try {
    const v = localStorage.getItem(VEHICLE_KEY);
    return v ? parseInt(v, 10) : null;
  } catch {
    return null;
  }
};

const EditVehicle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [type, setType] = useState("Motorcycle");
  const [plate, setPlate] = useState("LG-234-ABC");
  const [color, setColor] = useState("Black");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(VEHICLE_KEY, Date.now().toString());
    } catch {
      /* ignore */
    }
    toast({ title: "Vehicle updated", description: "Your vehicle details have been saved." });
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <Link to="/profile" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Edit Vehicle</h1>
      </div>
      <form onSubmit={handleSubmit} className="px-5 space-y-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Vehicle Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            {["Motorcycle", "Bicycle", "Scooter", "Car"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Plate Number</label>
          <input value={plate} onChange={e => setPlate(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Color</label>
          <input value={color} onChange={e => setColor(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <button type="submit" className="thumb-zone w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base active:animate-press">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditVehicle;