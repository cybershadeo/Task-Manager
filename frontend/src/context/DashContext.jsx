import { DashboardContext } from "./contextCreation";
import * as dashServices from "../services/dashboardServices";
import * as categoryServices from "../services/categoryService";
import { useEffect, useState, useCallback } from "react";

export const DashProvider = ({ children }) => {

  const [categories, setCategories] = useState([]);
  const [overview, setOverview] = useState({});
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);


  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const [statsData, userProile] = await Promise.all([
        dashServices.getDashboardStats(),
        dashServices.getUserProfile()
      ]);
          
      setCategories(statsData.data?.categories);
      setOverview(statsData.data?.overview);
      setUser(userProile.data);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    } finally {
        setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchStats();
  },[fetchStats]);

 
  const uncategorizedCount = overview?.uncategorizedTasks ?? 0;

  const AddCategory = async (categoryData) => {
  
      const response = await categoryServices.createCategory(categoryData);
      await fetchStats();

      return response.data;
  };

  const updateCategory = async (categoryId,updateData) => {
    const response = await categoryServices.updateCategory(categoryId, updateData);
    await fetchStats();

    return response.data;
    
  }

  const deleteCategory = async () => {
    const categoryId = selectedCategoryId;
    
      await categoryServices.deleteCategory(categoryId);
      
      setSelectedCategoryId(null);
      await fetchStats();
  }
  

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };


  const updateUserProfile = async (userId, updateData) => {
    const response = await dashServices.updateUserProfile(userId, updateData);
    setUser(response.data);

    return response.data;
  }

  const values = {
    overview,
    categories,
    isLoading,
    uncategorizedCount,
    selectedCategoryId,
    user,
    updateUserProfile,
    updateCategory,
    deleteCategory,
    onSelectCategory: handleSelectCategory,
    createCategory: AddCategory,
    refetchDashboard: fetchStats
  
  };

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};