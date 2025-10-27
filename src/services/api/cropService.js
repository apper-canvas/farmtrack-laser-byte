import { getApperClient } from "@/services/apperClient";

class CropService {
  constructor() {
    this.tableName = "crop_c";
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "crop_type_c" } },
          { field: { Name: "planting_date_c" } },
          { field: { Name: "field_location_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "expected_harvest_c" } },
          { field: { Name: "notes_c" } },
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
      console.error("Error fetching crops:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "crop_type_c" } },
          { field: { Name: "planting_date_c" } },
          { field: { Name: "field_location_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "expected_harvest_c" } },
          { field: { Name: "notes_c" } },
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
      console.error(`Error fetching crop ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async getByFarmId(farmId) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "crop_type_c" } },
          { field: { Name: "planting_date_c" } },
          { field: { Name: "field_location_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "expected_harvest_c" } },
          { field: { Name: "notes_c" } },
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
      console.error("Error fetching crops by farm:", error?.response?.data?.message || error);
      return [];
    }
  }

  async create(cropData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [
          {
            crop_type_c: cropData.crop_type_c,
            planting_date_c: new Date(cropData.planting_date_c).toISOString(),
            field_location_c: cropData.field_location_c,
            status_c: cropData.status_c,
            expected_harvest_c: new Date(cropData.expected_harvest_c).toISOString(),
            notes_c: cropData.notes_c || "",
            farm_id_c: parseInt(cropData.farm_id_c)
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
          console.error(`Failed to create crop:`, failed);
          throw new Error(failed[0].message || "Failed to create crop");
        }

        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      console.error("Error creating crop:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async update(id, cropData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [
          {
            Id: parseInt(id),
            crop_type_c: cropData.crop_type_c,
            planting_date_c: new Date(cropData.planting_date_c).toISOString(),
            field_location_c: cropData.field_location_c,
            status_c: cropData.status_c,
            expected_harvest_c: new Date(cropData.expected_harvest_c).toISOString(),
            notes_c: cropData.notes_c || "",
            farm_id_c: parseInt(cropData.farm_id_c)
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
          console.error(`Failed to update crop:`, failed);
          throw new Error(failed[0].message || "Failed to update crop");
        }

        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      console.error("Error updating crop:", error?.response?.data?.message || error);
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
          console.error(`Failed to delete crop:`, failed);
          throw new Error(failed[0].message || "Failed to delete crop");
        }

        return true;
      }

      return true;
    } catch (error) {
      console.error("Error deleting crop:", error?.response?.data?.message || error);
      throw error;
    }
  }
}

export default new CropService();