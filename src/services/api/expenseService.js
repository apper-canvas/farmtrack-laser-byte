import { getApperClient } from "@/services/apperClient";

class ExpenseService {
  constructor() {
    this.tableName = "expense_c";
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "farm_id_c" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "amount_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "CreatedOn" } }
        ]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching expenses:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "farm_id_c" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "amount_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "CreatedOn" } }
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching expense ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async getByFarmId(farmId) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "farm_id_c" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "amount_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "description_c" } }
        ],
        where: [
          {
            FieldName: "farm_id_c",
            Operator: "EqualTo",
            Values: [parseInt(farmId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching expenses by farm:", error?.response?.data?.message || error);
      return [];
    }
  }

  async create(expenseData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [
          {
            farm_id_c: parseInt(expenseData.farm_id_c),
            amount_c: parseFloat(expenseData.amount_c),
            category_c: expenseData.category_c,
            date_c: new Date(expenseData.date_c).toISOString(),
            description_c: expenseData.description_c
          }
        ]
      };

      const response = await apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create expense:`, failed);
          throw new Error(failed[0].message || "Failed to create expense");
        }

        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      console.error("Error creating expense:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async update(id, expenseData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [
          {
            Id: parseInt(id),
            farm_id_c: parseInt(expenseData.farm_id_c),
            amount_c: parseFloat(expenseData.amount_c),
            category_c: expenseData.category_c,
            date_c: new Date(expenseData.date_c).toISOString(),
            description_c: expenseData.description_c
          }
        ]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update expense:`, failed);
          throw new Error(failed[0].message || "Failed to update expense");
        }

        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      console.error("Error updating expense:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete expense:`, failed);
          throw new Error(failed[0].message || "Failed to delete expense");
        }

        return true;
      }

      return true;
    } catch (error) {
      console.error("Error deleting expense:", error?.response?.data?.message || error);
      throw error;
    }
  }
}

export default new ExpenseService();
export default new ExpenseService();