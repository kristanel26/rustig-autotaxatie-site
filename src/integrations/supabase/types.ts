export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      reports: {
        Row: {
          appraised_value: number | null
          appraised_value_text: string | null
          client_name: string | null
          condition_brakes: string | null
          condition_brakes_notes: string | null
          condition_electrical: string | null
          condition_electrical_notes: string | null
          condition_engine: string | null
          condition_engine_notes: string | null
          condition_steering: string | null
          condition_steering_notes: string | null
          condition_suspension: string | null
          condition_suspension_notes: string | null
          condition_transmission: string | null
          condition_transmission_notes: string | null
          constructievorm: string | null
          created_at: string
          customer_city: string | null
          customer_email: string | null
          customer_initials: string | null
          customer_last_name: string | null
          customer_phone: string | null
          customer_postcode: string | null
          customer_street: string | null
          customer_title: string | null
          document_reference: string | null
          exterior_body: string | null
          exterior_body_notes: string | null
          exterior_paint: string | null
          exterior_paint_notes: string | null
          exterior_rubbers: string | null
          exterior_rubbers_notes: string | null
          exterior_sealant: string | null
          exterior_sealant_notes: string | null
          exterior_windows: string | null
          exterior_windows_notes: string | null
          gebruik: string | null
          general_remarks: string | null
          id: string
          inspection_date: string | null
          inspection_end_time: string | null
          inspection_location: string | null
          inspection_start_time: string | null
          interior_dashboard: string | null
          interior_dashboard_notes: string | null
          interior_floor: string | null
          interior_floor_notes: string | null
          interior_kitchen: string | null
          interior_kitchen_notes: string | null
          interior_roof: string | null
          interior_roof_notes: string | null
          interior_sanitary: string | null
          interior_sanitary_notes: string | null
          interior_upholstery: string | null
          interior_upholstery_notes: string | null
          license_plate: string | null
          model_display_name: string | null
          opbouw_merk: string | null
          opbouw_type: string | null
          opdrachtgever: string | null
          quality_class: number | null
          rdw_aantal_cilinders: number | null
          rdw_aantal_deuren: number | null
          rdw_apk_gekeurd: boolean | null
          rdw_apk_vervaldatum: string | null
          rdw_bouwjaar: number | null
          rdw_brandstof: string | null
          rdw_carrosserievorm: string | null
          rdw_cilinderinhoud: number | null
          rdw_data_locked: boolean | null
          rdw_datum_eerste_tenaamstelling: string | null
          rdw_datum_eerste_toelating: string | null
          rdw_datum_laatste_tenaamstelling: string | null
          rdw_fetched_at: string | null
          rdw_handelsbenaming: string | null
          rdw_importvoertuig: boolean | null
          rdw_kleur: string | null
          rdw_ledig_gewicht: number | null
          rdw_massa_rijklaar: number | null
          rdw_max_massa: number | null
          rdw_merk: string | null
          rdw_transmissie: string | null
          rdw_vermogen_kw: number | null
          rdw_voertuigsoort: string | null
          rdw_wielbasis: number | null
          report_number: string
          rim_type: string | null
          soort_bouw: string | null
          staat_bij_opname: string | null
          stalling: string | null
          tellerstand: number | null
          tellerstand_type: string | null
          tire_front_left_brand: string | null
          tire_front_left_dot: string | null
          tire_front_left_season: string | null
          tire_front_left_size: string | null
          tire_front_right_brand: string | null
          tire_front_right_dot: string | null
          tire_front_right_season: string | null
          tire_front_right_size: string | null
          tire_rear_left_brand: string | null
          tire_rear_left_dot: string | null
          tire_rear_left_season: string | null
          tire_rear_left_size: string | null
          tire_rear_right_brand: string | null
          tire_rear_right_dot: string | null
          tire_rear_right_season: string | null
          tire_rear_right_size: string | null
          transmissie: string | null
          updated_at: string
          user_id: string
          vehicle_brand: string | null
          vehicle_model: string | null
          vehicle_photos: string[] | null
          vehicle_title: string | null
          vin: string | null
        }
        Insert: {
          appraised_value?: number | null
          appraised_value_text?: string | null
          client_name?: string | null
          condition_brakes?: string | null
          condition_brakes_notes?: string | null
          condition_electrical?: string | null
          condition_electrical_notes?: string | null
          condition_engine?: string | null
          condition_engine_notes?: string | null
          condition_steering?: string | null
          condition_steering_notes?: string | null
          condition_suspension?: string | null
          condition_suspension_notes?: string | null
          condition_transmission?: string | null
          condition_transmission_notes?: string | null
          constructievorm?: string | null
          created_at?: string
          customer_city?: string | null
          customer_email?: string | null
          customer_initials?: string | null
          customer_last_name?: string | null
          customer_phone?: string | null
          customer_postcode?: string | null
          customer_street?: string | null
          customer_title?: string | null
          document_reference?: string | null
          exterior_body?: string | null
          exterior_body_notes?: string | null
          exterior_paint?: string | null
          exterior_paint_notes?: string | null
          exterior_rubbers?: string | null
          exterior_rubbers_notes?: string | null
          exterior_sealant?: string | null
          exterior_sealant_notes?: string | null
          exterior_windows?: string | null
          exterior_windows_notes?: string | null
          gebruik?: string | null
          general_remarks?: string | null
          id?: string
          inspection_date?: string | null
          inspection_end_time?: string | null
          inspection_location?: string | null
          inspection_start_time?: string | null
          interior_dashboard?: string | null
          interior_dashboard_notes?: string | null
          interior_floor?: string | null
          interior_floor_notes?: string | null
          interior_kitchen?: string | null
          interior_kitchen_notes?: string | null
          interior_roof?: string | null
          interior_roof_notes?: string | null
          interior_sanitary?: string | null
          interior_sanitary_notes?: string | null
          interior_upholstery?: string | null
          interior_upholstery_notes?: string | null
          license_plate?: string | null
          model_display_name?: string | null
          opbouw_merk?: string | null
          opbouw_type?: string | null
          opdrachtgever?: string | null
          quality_class?: number | null
          rdw_aantal_cilinders?: number | null
          rdw_aantal_deuren?: number | null
          rdw_apk_gekeurd?: boolean | null
          rdw_apk_vervaldatum?: string | null
          rdw_bouwjaar?: number | null
          rdw_brandstof?: string | null
          rdw_carrosserievorm?: string | null
          rdw_cilinderinhoud?: number | null
          rdw_data_locked?: boolean | null
          rdw_datum_eerste_tenaamstelling?: string | null
          rdw_datum_eerste_toelating?: string | null
          rdw_datum_laatste_tenaamstelling?: string | null
          rdw_fetched_at?: string | null
          rdw_handelsbenaming?: string | null
          rdw_importvoertuig?: boolean | null
          rdw_kleur?: string | null
          rdw_ledig_gewicht?: number | null
          rdw_massa_rijklaar?: number | null
          rdw_max_massa?: number | null
          rdw_merk?: string | null
          rdw_transmissie?: string | null
          rdw_vermogen_kw?: number | null
          rdw_voertuigsoort?: string | null
          rdw_wielbasis?: number | null
          report_number: string
          rim_type?: string | null
          soort_bouw?: string | null
          staat_bij_opname?: string | null
          stalling?: string | null
          tellerstand?: number | null
          tellerstand_type?: string | null
          tire_front_left_brand?: string | null
          tire_front_left_dot?: string | null
          tire_front_left_season?: string | null
          tire_front_left_size?: string | null
          tire_front_right_brand?: string | null
          tire_front_right_dot?: string | null
          tire_front_right_season?: string | null
          tire_front_right_size?: string | null
          tire_rear_left_brand?: string | null
          tire_rear_left_dot?: string | null
          tire_rear_left_season?: string | null
          tire_rear_left_size?: string | null
          tire_rear_right_brand?: string | null
          tire_rear_right_dot?: string | null
          tire_rear_right_season?: string | null
          tire_rear_right_size?: string | null
          transmissie?: string | null
          updated_at?: string
          user_id: string
          vehicle_brand?: string | null
          vehicle_model?: string | null
          vehicle_photos?: string[] | null
          vehicle_title?: string | null
          vin?: string | null
        }
        Update: {
          appraised_value?: number | null
          appraised_value_text?: string | null
          client_name?: string | null
          condition_brakes?: string | null
          condition_brakes_notes?: string | null
          condition_electrical?: string | null
          condition_electrical_notes?: string | null
          condition_engine?: string | null
          condition_engine_notes?: string | null
          condition_steering?: string | null
          condition_steering_notes?: string | null
          condition_suspension?: string | null
          condition_suspension_notes?: string | null
          condition_transmission?: string | null
          condition_transmission_notes?: string | null
          constructievorm?: string | null
          created_at?: string
          customer_city?: string | null
          customer_email?: string | null
          customer_initials?: string | null
          customer_last_name?: string | null
          customer_phone?: string | null
          customer_postcode?: string | null
          customer_street?: string | null
          customer_title?: string | null
          document_reference?: string | null
          exterior_body?: string | null
          exterior_body_notes?: string | null
          exterior_paint?: string | null
          exterior_paint_notes?: string | null
          exterior_rubbers?: string | null
          exterior_rubbers_notes?: string | null
          exterior_sealant?: string | null
          exterior_sealant_notes?: string | null
          exterior_windows?: string | null
          exterior_windows_notes?: string | null
          gebruik?: string | null
          general_remarks?: string | null
          id?: string
          inspection_date?: string | null
          inspection_end_time?: string | null
          inspection_location?: string | null
          inspection_start_time?: string | null
          interior_dashboard?: string | null
          interior_dashboard_notes?: string | null
          interior_floor?: string | null
          interior_floor_notes?: string | null
          interior_kitchen?: string | null
          interior_kitchen_notes?: string | null
          interior_roof?: string | null
          interior_roof_notes?: string | null
          interior_sanitary?: string | null
          interior_sanitary_notes?: string | null
          interior_upholstery?: string | null
          interior_upholstery_notes?: string | null
          license_plate?: string | null
          model_display_name?: string | null
          opbouw_merk?: string | null
          opbouw_type?: string | null
          opdrachtgever?: string | null
          quality_class?: number | null
          rdw_aantal_cilinders?: number | null
          rdw_aantal_deuren?: number | null
          rdw_apk_gekeurd?: boolean | null
          rdw_apk_vervaldatum?: string | null
          rdw_bouwjaar?: number | null
          rdw_brandstof?: string | null
          rdw_carrosserievorm?: string | null
          rdw_cilinderinhoud?: number | null
          rdw_data_locked?: boolean | null
          rdw_datum_eerste_tenaamstelling?: string | null
          rdw_datum_eerste_toelating?: string | null
          rdw_datum_laatste_tenaamstelling?: string | null
          rdw_fetched_at?: string | null
          rdw_handelsbenaming?: string | null
          rdw_importvoertuig?: boolean | null
          rdw_kleur?: string | null
          rdw_ledig_gewicht?: number | null
          rdw_massa_rijklaar?: number | null
          rdw_max_massa?: number | null
          rdw_merk?: string | null
          rdw_transmissie?: string | null
          rdw_vermogen_kw?: number | null
          rdw_voertuigsoort?: string | null
          rdw_wielbasis?: number | null
          report_number?: string
          rim_type?: string | null
          soort_bouw?: string | null
          staat_bij_opname?: string | null
          stalling?: string | null
          tellerstand?: number | null
          tellerstand_type?: string | null
          tire_front_left_brand?: string | null
          tire_front_left_dot?: string | null
          tire_front_left_season?: string | null
          tire_front_left_size?: string | null
          tire_front_right_brand?: string | null
          tire_front_right_dot?: string | null
          tire_front_right_season?: string | null
          tire_front_right_size?: string | null
          tire_rear_left_brand?: string | null
          tire_rear_left_dot?: string | null
          tire_rear_left_season?: string | null
          tire_rear_left_size?: string | null
          tire_rear_right_brand?: string | null
          tire_rear_right_dot?: string | null
          tire_rear_right_season?: string | null
          tire_rear_right_size?: string | null
          transmissie?: string | null
          updated_at?: string
          user_id?: string
          vehicle_brand?: string | null
          vehicle_model?: string | null
          vehicle_photos?: string[] | null
          vehicle_title?: string | null
          vin?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
