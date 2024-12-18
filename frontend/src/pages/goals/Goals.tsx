import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface Goal {
  name: string;
  progress: number;
  category: string;
  goalAmount: number;
  currentSaving: number;
  reference: string;
}

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState<string>(""); 
  const [currentSaving, setCurrentSaving] = useState<string>(""); 
  const [category, setCategory] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const addGoal = () => {
    const parsedGoalAmount = Number(goalAmount);
    const parsedCurrentSaving = Number(currentSaving);

    if (goalName && parsedGoalAmount > 0 && parsedCurrentSaving >= 0 && category) {
      const progress = Math.min((parsedCurrentSaving / parsedGoalAmount) * 100, 100);
      const newGoal: Goal = {
        name: goalName,
        progress,
        category,
        goalAmount: parsedGoalAmount,
        currentSaving: parsedCurrentSaving,
        reference,
      };
      setGoals([...goals, newGoal]);

      setGoalName("");
      setGoalAmount("");
      setCurrentSaving("");
      setCategory("");
      setReference("");
    }
  };

  const getProgressBarColor = (category: string) => {
    switch (category) {
      case "personal":
        return "bg-green-400";
      case "travel":
        return "bg-blue-400";
      case "food":
        return "bg-orange-400";
      case "payments":
        return "bg-purple-400";
      case "other":
        return "bg-yellow-400";
      default:
        return "bg-gray-400";
    }
  };

  const handleDeleteGoal = (index: number) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  const handleEditGoal = (index: number) => {
    const goalToEdit = goals[index];
    setGoalName(goalToEdit.name);
    setGoalAmount(goalToEdit.goalAmount.toString());
    setCurrentSaving(goalToEdit.currentSaving.toString());
    setCategory(goalToEdit.category);
    setReference(goalToEdit.reference);
    setEditIndex(index);
    setIsPopupOpen(true);
  };

  const updateGoal = () => {
    if (editIndex !== null) {
      const parsedGoalAmount = Number(goalAmount);
      const parsedCurrentSaving = Number(currentSaving);

      if (goalName && parsedGoalAmount > 0 && parsedCurrentSaving >= 0 && category) {
        const progress = Math.min((parsedCurrentSaving / parsedGoalAmount) * 100, 100);
        const updatedGoal: Goal = {
          name: goalName,
          progress,
          category,
          goalAmount: parsedGoalAmount,
          currentSaving: parsedCurrentSaving,
          reference,
        };

        const updatedGoals = [...goals];
        updatedGoals[editIndex] = updatedGoal;
        setGoals(updatedGoals);

        setIsPopupOpen(false);
        setEditIndex(null);
        setGoalName("");
        setGoalAmount("");
        setCurrentSaving("");
        setCategory("");
        setReference("");
      }
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditIndex(null);
  };

  return (
    <div className="flex min-h-screen bg-Darkgrayishviolet text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow p-8 relative grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo */}
        <div className="absolute top-0 right-0 p-6">
          <img
            src={logo}
            alt="TrackXpense Logo"
            style={{ width: "380px", height: "70px" }}
          />
        </div>

        {/* Goal Form */}
        <div className="mt-36 max-w-md">
          <h1 className="text-2xl font-semibold mb-6">Goal</h1>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Goal Name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="w-80 h-10 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Goal Amount"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              className="w-80 h-10 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Current Saving"
              value={currentSaving}
              onChange={(e) => setCurrentSaving(e.target.value)}
              className="w-80 h-10 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
            />
            <select
              className="w-80 h-10 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Category
              </option>
              <option value="personal">Personal</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="payments">Payments</option>
              <option value="other">Other</option>
            </select>
            <textarea
              placeholder="Add A Reference"
              rows={3}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-80 h-50 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
            ></textarea>
            <button
              onClick={addGoal}
              className="w-60 h-10 pl-3 bg-orange-300 text-gray-900 py-2 rounded hover:bg-orange-400"
            >
              Add Goal
            </button>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-4 mt-44">
          {goals.map((goal, index) => (
            <div key={index} className="bg-Darkgrayishviolet border border-gray-200 p-4 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">{goal.name}</span>
                <span className="text-sm">{goal.progress.toFixed(0)}%</span>
                <div className="flex gap-2">
                  <FiEdit
                    onClick={() => handleEditGoal(index)}
                    className="cursor-pointer text-gray-200 hover:text-gray-400"
                  />
                  <FiTrash2
                    onClick={() => handleDeleteGoal(index)}
                    className="cursor-pointer text-gray-200 hover:text-gray-400"
                  />
                </div>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full">
                <div
                  className={`h-full rounded-full ${getProgressBarColor(goal.category)}`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-Darkgrayishviolet p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Update Goal</h2>
            <div className="space-y-4">
              <label className="block text-sm">Goal Name</label>
              <input
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="w-full h-10 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
              />
              <label className="block text-sm">Goal Amount</label>
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                className="w-full h-10 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
              />
              <label className="block text-sm">Current Saving</label>
              <input
                type="number"
                value={currentSaving}
                onChange={(e) => setCurrentSaving(e.target.value)}
                className="w-full h-10 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
              />
              <label className="block text-sm">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="personal">Personal</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
                <option value="payments">Payments</option>
                <option value="other">Other</option>
              </select>
              <label className="block text-sm">Reference</label>
              <textarea
                rows={3}
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
              ></textarea>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={closePopup}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={updateGoal}
                  className="px-4 py-2 bg-orange-300 text-gray-900 rounded hover:bg-orange-400"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
