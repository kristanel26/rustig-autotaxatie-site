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
      photo_extract_results: {
        Row: {
          accepted: boolean
          confidence: number
          created_at: string
          field_key: string
          id: string
          photo_type: string
          photo_url: string
          proposed_value: string | null
          raw_text: string | null
          report_id: string
          section: string
          status: string
        }
        Insert: {
          accepted?: boolean
          confidence: number
          created_at?: string
          field_key: string
          id?: string
          photo_type: string
          photo_url: string
          proposed_value?: string | null
          raw_text?: string | null
          report_id: string
          section: string
          status: string
        }
        Update: {
          accepted?: boolean
          confidence?: number
          created_at?: string
          field_key?: string
          id?: string
          photo_type?: string
          photo_url?: string
          proposed_value?: string | null
          raw_text?: string | null
          report_id?: string
          section?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "photo_extract_results_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
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
          earth_leakage_switch: boolean | null
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
          fire_extinguisher: boolean | null
          fused: boolean | null
          gas_detection: boolean | null
          gas_hose_production_date: string | null
          gebruik: string | null
          general_remarks: string | null
          herinnering_laatste_fout: string | null
          herinnering_status: string | null
          herinnering_verzonden_aan_email: string | null
          herinnering_verzonden_op: string | null
          id: string
          impression_body: string | null
          impression_brakes: string | null
          impression_electrical: string | null
          impression_engine: string | null
          impression_extras: string | null
          impression_general: string | null
          impression_interior: string | null
          impression_steering: string | null
          impression_suspension: string | null
          impression_transmission: string | null
          impression_wheels_tires: string | null
          inspection_date: string | null
          inspection_end_time: string | null
          inspection_location: string | null
          inspection_start_time: string | null
          installation_electrical: string | null
          installation_gas: string | null
          installation_water: string | null
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
          leakage_electrical: string | null
          license_plate: string | null
          loose_gas_tanks: boolean | null
          lpg_underbody: boolean | null
          mechanical_security: string | null
          model_display_name: string | null
          moisture_advice: string | null
          moisture_measurement_performed: boolean | null
          onboard_battery: boolean | null
          opbouw_merk: string | null
          opbouw_type: string | null
          opdrachtgever: string | null
          photo_types: Json | null
          pressure_regulator_production_date: string | null
          quality_class: string | null
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
          report_type: string | null
          rim_type: string | null
          security_present: boolean | null
          security_type: string | null
          smoke_detector: boolean | null
          soort_bouw: string | null
          staat_bij_opname: string | null
          stalling: string | null
          starter_battery: boolean | null
          tellerstand: number | null
          tellerstand_type: string | null
          tire_advice: string | null
          tire_bandenmaat: string | null
          tire_front_left_brand: string | null
          tire_front_left_dot: string | null
          tire_front_left_model: string | null
          tire_front_left_profiel: string | null
          tire_front_left_season: string | null
          tire_front_left_size: string | null
          tire_front_right_brand: string | null
          tire_front_right_dot: string | null
          tire_front_right_model: string | null
          tire_front_right_profiel: string | null
          tire_front_right_season: string | null
          tire_front_right_size: string | null
          tire_rear_left_brand: string | null
          tire_rear_left_dot: string | null
          tire_rear_left_model: string | null
          tire_rear_left_profiel: string | null
          tire_rear_left_season: string | null
          tire_rear_left_size: string | null
          tire_rear_right_brand: string | null
          tire_rear_right_dot: string | null
          tire_rear_right_model: string | null
          tire_rear_right_profiel: string | null
          tire_rear_right_season: string | null
          tire_rear_right_size: string | null
          tracking_brand: string | null
          transmissie: string | null
          updated_at: string
          user_id: string
          vehicle_brand: string | null
          vehicle_model: string | null
          vehicle_photo_rotations: Json | null
          vehicle_photos: string[] | null
          vehicle_title: string | null
          vehicle_tracking: boolean | null
          vin: string | null
          voltage: string | null
          wev_autotelex_lookup_timestamp: string | null
          wev_bandbreedte_max: number | null
          wev_bandbreedte_min: number | null
          wev_berekend: number | null
          wev_bron_waardes: string | null
          wev_btw_marge_override_motivatie: string | null
          wev_btw_of_marge: string | null
          wev_comparables: Json | null
          wev_correcties_motivatie: string | null
          wev_definitief: number | null
          wev_doel_taxatie: string | null
          wev_doelgroep: string | null
          wev_eindwaarde: number | null
          wev_finalized_at: string | null
          wev_handelsinkoopwaarde_autotelex: number | null
          wev_km_stand_correctie: string | null
          wev_locked: boolean | null
          wev_manual_source_note: string | null
          wev_marktsegment: string | null
          wev_motivatie_eindwaarde: string | null
          wev_originaliteit_correctie: string | null
          wev_override_actief: boolean | null
          wev_override_redenering: string | null
          wev_peildatum: string | null
          wev_reden_peildatum: string | null
          wev_schade_correctie: string | null
          wev_staat_correctie: string | null
          wev_status: string | null
          wev_verkoopwaarde_autotelex: number | null
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
          earth_leakage_switch?: boolean | null
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
          fire_extinguisher?: boolean | null
          fused?: boolean | null
          gas_detection?: boolean | null
          gas_hose_production_date?: string | null
          gebruik?: string | null
          general_remarks?: string | null
          herinnering_laatste_fout?: string | null
          herinnering_status?: string | null
          herinnering_verzonden_aan_email?: string | null
          herinnering_verzonden_op?: string | null
          id?: string
          impression_body?: string | null
          impression_brakes?: string | null
          impression_electrical?: string | null
          impression_engine?: string | null
          impression_extras?: string | null
          impression_general?: string | null
          impression_interior?: string | null
          impression_steering?: string | null
          impression_suspension?: string | null
          impression_transmission?: string | null
          impression_wheels_tires?: string | null
          inspection_date?: string | null
          inspection_end_time?: string | null
          inspection_location?: string | null
          inspection_start_time?: string | null
          installation_electrical?: string | null
          installation_gas?: string | null
          installation_water?: string | null
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
          leakage_electrical?: string | null
          license_plate?: string | null
          loose_gas_tanks?: boolean | null
          lpg_underbody?: boolean | null
          mechanical_security?: string | null
          model_display_name?: string | null
          moisture_advice?: string | null
          moisture_measurement_performed?: boolean | null
          onboard_battery?: boolean | null
          opbouw_merk?: string | null
          opbouw_type?: string | null
          opdrachtgever?: string | null
          photo_types?: Json | null
          pressure_regulator_production_date?: string | null
          quality_class?: string | null
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
          report_type?: string | null
          rim_type?: string | null
          security_present?: boolean | null
          security_type?: string | null
          smoke_detector?: boolean | null
          soort_bouw?: string | null
          staat_bij_opname?: string | null
          stalling?: string | null
          starter_battery?: boolean | null
          tellerstand?: number | null
          tellerstand_type?: string | null
          tire_advice?: string | null
          tire_bandenmaat?: string | null
          tire_front_left_brand?: string | null
          tire_front_left_dot?: string | null
          tire_front_left_model?: string | null
          tire_front_left_profiel?: string | null
          tire_front_left_season?: string | null
          tire_front_left_size?: string | null
          tire_front_right_brand?: string | null
          tire_front_right_dot?: string | null
          tire_front_right_model?: string | null
          tire_front_right_profiel?: string | null
          tire_front_right_season?: string | null
          tire_front_right_size?: string | null
          tire_rear_left_brand?: string | null
          tire_rear_left_dot?: string | null
          tire_rear_left_model?: string | null
          tire_rear_left_profiel?: string | null
          tire_rear_left_season?: string | null
          tire_rear_left_size?: string | null
          tire_rear_right_brand?: string | null
          tire_rear_right_dot?: string | null
          tire_rear_right_model?: string | null
          tire_rear_right_profiel?: string | null
          tire_rear_right_season?: string | null
          tire_rear_right_size?: string | null
          tracking_brand?: string | null
          transmissie?: string | null
          updated_at?: string
          user_id: string
          vehicle_brand?: string | null
          vehicle_model?: string | null
          vehicle_photo_rotations?: Json | null
          vehicle_photos?: string[] | null
          vehicle_title?: string | null
          vehicle_tracking?: boolean | null
          vin?: string | null
          voltage?: string | null
          wev_autotelex_lookup_timestamp?: string | null
          wev_bandbreedte_max?: number | null
          wev_bandbreedte_min?: number | null
          wev_berekend?: number | null
          wev_bron_waardes?: string | null
          wev_btw_marge_override_motivatie?: string | null
          wev_btw_of_marge?: string | null
          wev_comparables?: Json | null
          wev_correcties_motivatie?: string | null
          wev_definitief?: number | null
          wev_doel_taxatie?: string | null
          wev_doelgroep?: string | null
          wev_eindwaarde?: number | null
          wev_finalized_at?: string | null
          wev_handelsinkoopwaarde_autotelex?: number | null
          wev_km_stand_correctie?: string | null
          wev_locked?: boolean | null
          wev_manual_source_note?: string | null
          wev_marktsegment?: string | null
          wev_motivatie_eindwaarde?: string | null
          wev_originaliteit_correctie?: string | null
          wev_override_actief?: boolean | null
          wev_override_redenering?: string | null
          wev_peildatum?: string | null
          wev_reden_peildatum?: string | null
          wev_schade_correctie?: string | null
          wev_staat_correctie?: string | null
          wev_status?: string | null
          wev_verkoopwaarde_autotelex?: number | null
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
          earth_leakage_switch?: boolean | null
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
          fire_extinguisher?: boolean | null
          fused?: boolean | null
          gas_detection?: boolean | null
          gas_hose_production_date?: string | null
          gebruik?: string | null
          general_remarks?: string | null
          herinnering_laatste_fout?: string | null
          herinnering_status?: string | null
          herinnering_verzonden_aan_email?: string | null
          herinnering_verzonden_op?: string | null
          id?: string
          impression_body?: string | null
          impression_brakes?: string | null
          impression_electrical?: string | null
          impression_engine?: string | null
          impression_extras?: string | null
          impression_general?: string | null
          impression_interior?: string | null
          impression_steering?: string | null
          impression_suspension?: string | null
          impression_transmission?: string | null
          impression_wheels_tires?: string | null
          inspection_date?: string | null
          inspection_end_time?: string | null
          inspection_location?: string | null
          inspection_start_time?: string | null
          installation_electrical?: string | null
          installation_gas?: string | null
          installation_water?: string | null
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
          leakage_electrical?: string | null
          license_plate?: string | null
          loose_gas_tanks?: boolean | null
          lpg_underbody?: boolean | null
          mechanical_security?: string | null
          model_display_name?: string | null
          moisture_advice?: string | null
          moisture_measurement_performed?: boolean | null
          onboard_battery?: boolean | null
          opbouw_merk?: string | null
          opbouw_type?: string | null
          opdrachtgever?: string | null
          photo_types?: Json | null
          pressure_regulator_production_date?: string | null
          quality_class?: string | null
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
          report_type?: string | null
          rim_type?: string | null
          security_present?: boolean | null
          security_type?: string | null
          smoke_detector?: boolean | null
          soort_bouw?: string | null
          staat_bij_opname?: string | null
          stalling?: string | null
          starter_battery?: boolean | null
          tellerstand?: number | null
          tellerstand_type?: string | null
          tire_advice?: string | null
          tire_bandenmaat?: string | null
          tire_front_left_brand?: string | null
          tire_front_left_dot?: string | null
          tire_front_left_model?: string | null
          tire_front_left_profiel?: string | null
          tire_front_left_season?: string | null
          tire_front_left_size?: string | null
          tire_front_right_brand?: string | null
          tire_front_right_dot?: string | null
          tire_front_right_model?: string | null
          tire_front_right_profiel?: string | null
          tire_front_right_season?: string | null
          tire_front_right_size?: string | null
          tire_rear_left_brand?: string | null
          tire_rear_left_dot?: string | null
          tire_rear_left_model?: string | null
          tire_rear_left_profiel?: string | null
          tire_rear_left_season?: string | null
          tire_rear_left_size?: string | null
          tire_rear_right_brand?: string | null
          tire_rear_right_dot?: string | null
          tire_rear_right_model?: string | null
          tire_rear_right_profiel?: string | null
          tire_rear_right_season?: string | null
          tire_rear_right_size?: string | null
          tracking_brand?: string | null
          transmissie?: string | null
          updated_at?: string
          user_id?: string
          vehicle_brand?: string | null
          vehicle_model?: string | null
          vehicle_photo_rotations?: Json | null
          vehicle_photos?: string[] | null
          vehicle_title?: string | null
          vehicle_tracking?: boolean | null
          vin?: string | null
          voltage?: string | null
          wev_autotelex_lookup_timestamp?: string | null
          wev_bandbreedte_max?: number | null
          wev_bandbreedte_min?: number | null
          wev_berekend?: number | null
          wev_bron_waardes?: string | null
          wev_btw_marge_override_motivatie?: string | null
          wev_btw_of_marge?: string | null
          wev_comparables?: Json | null
          wev_correcties_motivatie?: string | null
          wev_definitief?: number | null
          wev_doel_taxatie?: string | null
          wev_doelgroep?: string | null
          wev_eindwaarde?: number | null
          wev_finalized_at?: string | null
          wev_handelsinkoopwaarde_autotelex?: number | null
          wev_km_stand_correctie?: string | null
          wev_locked?: boolean | null
          wev_manual_source_note?: string | null
          wev_marktsegment?: string | null
          wev_motivatie_eindwaarde?: string | null
          wev_originaliteit_correctie?: string | null
          wev_override_actief?: boolean | null
          wev_override_redenering?: string | null
          wev_peildatum?: string | null
          wev_reden_peildatum?: string | null
          wev_schade_correctie?: string | null
          wev_staat_correctie?: string | null
          wev_status?: string | null
          wev_verkoopwaarde_autotelex?: number | null
        }
        Relationships: []
      }
      tire_brands: {
        Row: {
          created_at: string
          id: string
          last_used_at: string
          name: string
          usage_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          last_used_at?: string
          name: string
          usage_count?: number
        }
        Update: {
          created_at?: string
          id?: string
          last_used_at?: string
          name?: string
          usage_count?: number
        }
        Relationships: []
      }
      vehicle_colors: {
        Row: {
          created_at: string
          hex_value: string | null
          id: string
          is_active: boolean
          name: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          hex_value?: string | null
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          hex_value?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      wev_documents: {
        Row: {
          created_at: string
          document_type: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          report_id: string
          uploaded_at: string
        }
        Insert: {
          created_at?: string
          document_type: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          report_id: string
          uploaded_at?: string
        }
        Update: {
          created_at?: string
          document_type?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          report_id?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wev_documents_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
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
