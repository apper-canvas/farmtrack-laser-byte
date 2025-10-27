import { getApperClient } from "@/services/apperClient";

class TaskService {
  constructor() {
    this.tableName = "task_c";
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "farm_id_c" }, referenceField: { field: { Name: "Name" } } },
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
      console.error("Error fetching tasks:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "farm_id_c" }, referenceField: { field: { Name: "Name" } } },
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
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async getByFarmId(farmId) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "farm_id_c" }, referenceField: { field: { Name: "Name" } } }
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
      console.error("Error fetching tasks by farm:", error?.response?.data?.message || error);
      return [];
    }
  }

  async create(taskData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [
          {
title_c: taskData.title_c,
            description_c: taskData.description_c || "",
            ...(taskData.due_date_c && { due_date_c: new Date(taskData.due_date_c).toISOString() }),
            priority_c: taskData.priority_c,
            completed_c: false,
            completed_at_c: null,
            farm_id_c: parseInt(taskData.farm_id_c)
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
          console.error(`Failed to create task:`, failed);
          throw new Error(failed[0].message || "Failed to create task");
        }

        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async update(id, taskData) {
    try {
      const apperClient = getApperClient();
      
      const updateRecord = {
        Id: parseInt(id)
      };

if (taskData.title_c !== undefined) updateRecord.title_c = taskData.title_c;
      if (taskData.description_c !== undefined) updateRecord.description_c = taskData.description_c;
      if (taskData.due_date_c !== undefined && taskData.due_date_c) updateRecord.due_date_c = new Date(taskData.due_date_c).toISOString();
      if (taskData.priority_c !== undefined) updateRecord.priority_c = taskData.priority_c;
      if (taskData.completed_c !== undefined) updateRecord.completed_c = taskData.completed_c;
      if (taskData.completed_at_c !== undefined) updateRecord.completed_at_c = taskData.completed_at_c;
      if (taskData.farm_id_c !== undefined) updateRecord.farm_id_c = parseInt(taskData.farm_id_c);

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update task:`, failed);
          throw new Error(failed[0].message || "Failed to update task");
        }

        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      console.error("Error updating task:", error?.response?.data?.message || error);
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
          console.error(`Failed to delete task:`, failed);
          throw new Error(failed[0].message || "Failed to delete task");
        }

        return true;
      }

      return true;
    } catch (error) {
      console.error("Error deleting task:", error?.response?.data?.message || error);
      throw error;
    }
  }
}

export default new TaskService();