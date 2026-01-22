import { DashboardContext } from "./contextCreation";
import * as dashServices from "../services/dashboardServices";
import * as categoryServices from "../services/categoryService";
import { useEffect, useState } from "react";

export const DashProvider = ({ children }) => {
  const [stats, setStats] = useState({ overview: null, categories: [] });
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const [statsData, userProile] = await Promise.all([
          dashServices.getDashboardStats(),
          dashServices.getUserProfile()
        ]);
          
        setStats(statsData.data)
        setUser(userProile.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  
  const { overview, categories, taskBreakdown } = stats;
  const uncategorizedCount = overview?.uncategorizedTasks ?? 0;

  const handleAddCategory = async (name, color) => {
    try {
      const response = await categoryServices.createCategory({ name, color });
      const addedCategory = response.data;
      
      // Update categories in stats
      setStats((prev) => ({
        ...prev,
        categories: [...prev.categories, {
          categoryId: addedCategory.id,
          categoryName: addedCategory.name,
          taskCount: 0,
          subtaskCount: 0
        }],
        overview: {
          ...prev.overview,
          totalCategories: (prev.overview?.totalCategories || 0) + 1
        }
      }));
      
      return addedCategory;
    } catch (error) {
      console.error("Failed to create category:", error);
      throw error;
    }
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  // Refresh stats (useful after creating/deleting tasks)
  const refreshStats = async () => {
    try {
      const StatsData = await dashServices.getDashboardStats();
      setStats(StatsData.data);
    } catch (error) {
      console.error("Failed to refresh stats:", error);
    }
  };

 

  const updateUserProfile = async (userId, updateData) => {
    console.log(updateData);
    try {
      const response = await dashServices.updateUserProfile(userId, updateData);
      const updatedUser = response?.data;
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update userProfile:', error);
      throw error;
    }
  }

  const values = {
    overview,
    taskBreakdown,
    categories,
    isLoading,
    uncategorizedCount,
    selectedCategoryId,
    user,
    updateUserProfile,
    onSelectCategory: handleSelectCategory,
    createCategory: handleAddCategory,
    refreshStats,
  };

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};