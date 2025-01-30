import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert } from "@/components/ui/alert";
import { Toggle } from "@/components/ui/toggle";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { Wind, Droplet, Leaf, AlertCircle, TrendingUp, Settings, CheckCircle } from "lucide-react";

const mockData = [
  { name: "Jan", energy: 400 },
  { name: "Feb", energy: 380 },
  { name: "Mar", energy: 360 },
  { name: "Apr", energy: 340 },
];

const COLORS = ["#FFD700", "#00BFFF", "#32CD32", "#8B4513"];

export default function RenewableEnergyManagementSystems() {
  const [co2Savings, setCo2Savings] = useState(50);
  const [maintenanceAlert, setMaintenanceAlert] = useState(false);
  const [surplusEnergy, setSurplusEnergy] = useState(10);
  const [recommendations, setRecommendations] = useState([
    "Reduce nighttime consumption", 
    "Optimize solar panel angle", 
    "Improve battery storage efficiency", 
    "Increase wind turbine maintenance intervals", 
    "Use AI to predict peak demand"
  ]);
  const [energyProduction, setEnergyProduction] = useState({ solar: 200, wind: 150, hydro: 100, biomass: 50 });
  const [energyConsumption, setEnergyConsumption] = useState(450);
  const [sensorMode, setSensorMode] = useState("Auto");
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    setTimeout(() => setMaintenanceAlert(true), 5000);

    const interval = setInterval(() => {
      setEnergyProduction({
        solar: Math.random() * 300,
        wind: Math.random() * 200,
        hydro: Math.random() * 150,
        biomass: Math.random() * 100,
      });
      setEnergyConsumption(Math.floor(Math.random() * 600 + 200));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 grid gap-4 grid-cols-2">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold col-span-2 text-center">Renewable Energy Management Systems</h1>
      
      {/* CO2 Savings Tracker */}
      <Card className="border-l-4 border-green-500">
        <CardContent>
          <h2 className="text-green-700 font-bold flex items-center gap-2"><Leaf /> CO₂ Savings</h2>
          <Progress value={co2Savings} className="bg-green-300" />
          <p>{co2Savings}% saved compared to average grid usage</p>
          <p className="text-green-600 flex items-center"><CheckCircle /> Great job reducing emissions!</p>
        </CardContent>
      </Card>
      
      {/* Maintenance Alerts */}
      {maintenanceAlert && (
        <Alert className="border-l-4 border-red-500 text-red-700 flex items-center gap-2">
          <AlertCircle /> <p>Maintenance Required: Sensor needs cleaning</p>
        </Alert>
      )}
      
      {/* Energy Consumption Trends */}
      <Card className="border-l-4 border-blue-500">
        <CardContent>
          <h2 className="text-blue-700 font-bold flex items-center gap-2"><TrendingUp /> Energy Consumption Trends</h2>
          <LineChart width={400} height={200} data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="energy" stroke="#8884d8" />
          </LineChart>
        </CardContent>
      </Card>
      
      {/* Live Energy Stats */}
      <Card className="border-l-4 border-yellow-500">
        <CardContent>
          <h2 className="text-yellow-700 font-bold flex items-center gap-2"> Live Energy Stats</h2>
          <PieChart width={200} height={200}>
            <Pie dataKey="value" data={Object.entries(energyProduction).map(([name, value], index) => ({ name, value }))} cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
              {Object.keys(energyProduction).map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
          <p><span className="font-bold">Total Consumption:</span> {energyConsumption} kW</p>
        </CardContent>
      </Card>
      
      {/* Surplus Energy Management */}
      <Card className="border-l-4 border-purple-500">
        <CardContent>
          <h2 className="text-purple-700 font-bold flex items-center gap-2"><Leaf /> Surplus Energy</h2>
          <p>Available: {surplusEnergy} kWh</p>
          <Button onClick={() => { setSurplusEnergy(0); setPopupMessage(`You saved €${surplusEnergy * 5} by selling surplus energy!`); }} className="bg-purple-500 text-white">Sell to Grid</Button>
          <Button onClick={() => { setSurplusEnergy(0); setPopupMessage(`You stored ${surplusEnergy} kWh in the batteries!`); }} className="bg-green-500 text-white ml-2">Store in Batteries</Button>
          {popupMessage && <p className="text-purple-600 font-bold">{popupMessage}</p>}
        </CardContent>
      </Card>
      
      {/* AI Recommendations */}
      <Card className="border-l-4 border-gray-500">
        <CardContent>
          <h2 className="text-gray-700 font-bold">AI Recommendations</h2>
          <ul>
            {recommendations.map((rec, index) => (<li key={index}>{rec}</li>))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Settings Panel */}
      <Card className="border-l-4 border-teal-500">
        <CardContent>
          <h2 className="text-teal-700 font-bold flex items-center gap-2"><Settings /> System Settings</h2>
          <select className="w-full p-2 border rounded">
            <option>Sensor Settings</option>
            <option>Power Consumption Goals</option>
          </select>
        </CardContent>
      </Card>
    </div>
  );
}
