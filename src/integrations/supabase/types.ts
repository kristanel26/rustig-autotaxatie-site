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
      customers: {
        Row: {
          city: string | null
          company_name: string | null
          created_at: string
          customer_type: string
          email: string | null
          first_name: string | null
          house_number: string | null
          id: string
          initials: string | null
          kvk_nummer: string | null
          last_name: string
          notes: string | null
          phone: string | null
          postal_code: string | null
          rsin: string | null
          salutation: string | null
          street: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          city?: string | null
          company_name?: string | null
          created_at?: string
          customer_type?: string
          email?: string | null
          first_name?: string | null
          house_number?: string | null
          id?: string
          initials?: string | null
          kvk_nummer?: string | null
          last_name: string
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          rsin?: string | null
          salutation?: string | null
          street?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          city?: string | null
          company_name?: string | null
          created_at?: string
          customer_type?: string
          email?: string | null
          first_name?: string | null
          house_number?: string | null
          id?: string
          initials?: string | null
          kvk_nummer?: string | null
          last_name?: string
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          rsin?: string | null
          salutation?: string | null
          street?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
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
      report_attachments: {
        Row: {
          attachment_type: string
          created_at: string
          extracted_retail_value: number | null
          extracted_source_reference: string | null
          extracted_trade_in_value: number | null
          file_name: string
          file_url: string
          id: string
          report_id: string
          uploaded_at: string
        }
        Insert: {
          attachment_type: string
          created_at?: string
          extracted_retail_value?: number | null
          extracted_source_reference?: string | null
          extracted_trade_in_value?: number | null
          file_name: string
          file_url: string
          id?: string
          report_id: string
          uploaded_at?: string
        }
        Update: {
          attachment_type?: string
          created_at?: string
          extracted_retail_value?: number | null
          extracted_source_reference?: string | null
          extracted_trade_in_value?: number | null
          file_name?: string
          file_url?: string
          id?: string
          report_id?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_attachments_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_client: {
        Row: {
          city: string | null
          created_at: string
          email_internal: string | null
          first_name: string | null
          house_number: string | null
          id: string
          initials: string | null
          last_name: string
          phone_internal: string | null
          postal_code: string | null
          report_id: string
          salutation: string | null
          street: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          email_internal?: string | null
          first_name?: string | null
          house_number?: string | null
          id?: string
          initials?: string | null
          last_name: string
          phone_internal?: string | null
          postal_code?: string | null
          report_id: string
          salutation?: string | null
          street?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          email_internal?: string | null
          first_name?: string | null
          house_number?: string | null
          id?: string
          initials?: string | null
          last_name?: string
          phone_internal?: string | null
          postal_code?: string | null
          report_id?: string
          salutation?: string | null
          street?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_client_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: true
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_comparables: {
        Row: {
          asking_price: number | null
          created_at: string
          id: string
          mileage: number | null
          notes: string | null
          report_id: string
          sort_order: number | null
          source: string | null
          title: string
          updated_at: string
          url: string | null
          year: number | null
        }
        Insert: {
          asking_price?: number | null
          created_at?: string
          id?: string
          mileage?: number | null
          notes?: string | null
          report_id: string
          sort_order?: number | null
          source?: string | null
          title: string
          updated_at?: string
          url?: string | null
          year?: number | null
        }
        Update: {
          asking_price?: number | null
          created_at?: string
          id?: string
          mileage?: number | null
          notes?: string | null
          report_id?: string
          sort_order?: number | null
          source?: string | null
          title?: string
          updated_at?: string
          url?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "report_comparables_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_condition_sections: {
        Row: {
          condition_rating: string | null
          created_at: string
          id: string
          notes: string | null
          report_id: string
          section_key: string
          updated_at: string
        }
        Insert: {
          condition_rating?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          report_id: string
          section_key: string
          updated_at?: string
        }
        Update: {
          condition_rating?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          report_id?: string
          section_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_condition_sections_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_deliveries: {
        Row: {
          created_at: string
          email_provider_message_id: string | null
          error_message: string | null
          id: string
          report_id: string
          sent_at: string
          sent_to_email: string
          status: string
        }
        Insert: {
          created_at?: string
          email_provider_message_id?: string | null
          error_message?: string | null
          id?: string
          report_id: string
          sent_at?: string
          sent_to_email: string
          status?: string
        }
        Update: {
          created_at?: string
          email_provider_message_id?: string | null
          error_message?: string | null
          id?: string
          report_id?: string
          sent_at?: string
          sent_to_email?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_deliveries_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_downloads: {
        Row: {
          created_at: string
          downloaded_at: string
          id: string
          ip_address: string | null
          report_id: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          downloaded_at?: string
          id?: string
          ip_address?: string | null
          report_id: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          downloaded_at?: string
          id?: string
          ip_address?: string | null
          report_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_downloads_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_inspection: {
        Row: {
          created_at: string
          end_time: string | null
          id: string
          inspection_date: string | null
          inspection_location: string | null
          report_id: string
          start_time: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          id?: string
          inspection_date?: string | null
          inspection_location?: string | null
          report_id: string
          start_time?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_time?: string | null
          id?: string
          inspection_date?: string | null
          inspection_location?: string | null
          report_id?: string
          start_time?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_inspection_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: true
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_market: {
        Row: {
          created_at: string
          final_value: number
          id: string
          report_id: string
          retail_value: number
          source: string | null
          trade_in_value: number
          updated_at: string
          vat_margin_type: string
          wev_calculated_avg: number | null
        }
        Insert: {
          created_at?: string
          final_value: number
          id?: string
          report_id: string
          retail_value: number
          source?: string | null
          trade_in_value: number
          updated_at?: string
          vat_margin_type: string
          wev_calculated_avg?: number | null
        }
        Update: {
          created_at?: string
          final_value?: number
          id?: string
          report_id?: string
          retail_value?: number
          source?: string | null
          trade_in_value?: number
          updated_at?: string
          vat_margin_type?: string
          wev_calculated_avg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "report_market_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: true
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_media_photos: {
        Row: {
          created_at: string
          file_name: string
          file_url: string
          id: string
          is_cover: boolean | null
          report_id: string
          rotation_degrees: number | null
          sort_order: number | null
          uploaded_at: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_url: string
          id?: string
          is_cover?: boolean | null
          report_id: string
          rotation_degrees?: number | null
          sort_order?: number | null
          uploaded_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_url?: string
          id?: string
          is_cover?: boolean | null
          report_id?: string
          rotation_degrees?: number | null
          sort_order?: number | null
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_media_photos_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_share_tokens: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          report_id: string
          revoked_at: string | null
          token: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          report_id: string
          revoked_at?: string | null
          token: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          report_id?: string
          revoked_at?: string | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_share_tokens_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_valuation_narratives: {
        Row: {
          corrections_motivation: string
          created_at: string
          final_motivation: string
          general_remarks: string | null
          id: string
          max_bandwidth: number
          min_bandwidth: number
          report_id: string
          updated_at: string
        }
        Insert: {
          corrections_motivation: string
          created_at?: string
          final_motivation: string
          general_remarks?: string | null
          id?: string
          max_bandwidth: number
          min_bandwidth: number
          report_id: string
          updated_at?: string
        }
        Update: {
          corrections_motivation?: string
          created_at?: string
          final_motivation?: string
          general_remarks?: string | null
          id?: string
          max_bandwidth?: number
          min_bandwidth?: number
          report_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_valuation_narratives_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: true
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_vehicle: {
        Row: {
          body_type: string | null
          build_year: number | null
          color: string | null
          created_at: string
          cylinders: number | null
          engine_cc: number | null
          first_registration_date: string | null
          fuel_type: string | null
          id: string
          license_plate: string | null
          make: string | null
          model: string | null
          odometer_unit: string | null
          odometer_value: number | null
          power_kw: number | null
          report_id: string
          transmission_type: string | null
          trim: string | null
          updated_at: string
          vin: string | null
        }
        Insert: {
          body_type?: string | null
          build_year?: number | null
          color?: string | null
          created_at?: string
          cylinders?: number | null
          engine_cc?: number | null
          first_registration_date?: string | null
          fuel_type?: string | null
          id?: string
          license_plate?: string | null
          make?: string | null
          model?: string | null
          odometer_unit?: string | null
          odometer_value?: number | null
          power_kw?: number | null
          report_id: string
          transmission_type?: string | null
          trim?: string | null
          updated_at?: string
          vin?: string | null
        }
        Update: {
          body_type?: string | null
          build_year?: number | null
          color?: string | null
          created_at?: string
          cylinders?: number | null
          engine_cc?: number | null
          first_registration_date?: string | null
          fuel_type?: string | null
          id?: string
          license_plate?: string | null
          make?: string | null
          model?: string | null
          odometer_unit?: string | null
          odometer_value?: number | null
          power_kw?: number | null
          report_id?: string
          transmission_type?: string | null
          trim?: string | null
          updated_at?: string
          vin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_vehicle_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: true
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
          customer_id: string | null
          customer_initials: string | null
          customer_last_name: string | null
          customer_phone: string | null
          customer_postcode: string | null
          customer_street: string | null
          customer_title: string | null
          document_reference: string | null
          download_count: number | null
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
          first_downloaded_at: string | null
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
          kleur_laksoort: string | null
          last_downloaded_at: string | null
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
          ready_at: string | null
          reminder_due_date: string | null
          reminder_sent_at: string | null
          report_number: string
          report_type: string | null
          rim_type: string | null
          security_present: boolean | null
          security_type: string | null
          sent_at: string | null
          signed_at: string | null
          smoke_detector: boolean | null
          soort_bouw: string | null
          staat_bij_opname: string | null
          stalling: string | null
          starter_battery: boolean | null
          status: string | null
          tellerstand: number | null
          tellerstand_type: string | null
          tire_advice: string | null
          tire_bandenmaat: string | null
          tire_bandenmaat_achter: string | null
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
          customer_id?: string | null
          customer_initials?: string | null
          customer_last_name?: string | null
          customer_phone?: string | null
          customer_postcode?: string | null
          customer_street?: string | null
          customer_title?: string | null
          document_reference?: string | null
          download_count?: number | null
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
          first_downloaded_at?: string | null
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
          kleur_laksoort?: string | null
          last_downloaded_at?: string | null
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
          ready_at?: string | null
          reminder_due_date?: string | null
          reminder_sent_at?: string | null
          report_number: string
          report_type?: string | null
          rim_type?: string | null
          security_present?: boolean | null
          security_type?: string | null
          sent_at?: string | null
          signed_at?: string | null
          smoke_detector?: boolean | null
          soort_bouw?: string | null
          staat_bij_opname?: string | null
          stalling?: string | null
          starter_battery?: boolean | null
          status?: string | null
          tellerstand?: number | null
          tellerstand_type?: string | null
          tire_advice?: string | null
          tire_bandenmaat?: string | null
          tire_bandenmaat_achter?: string | null
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
          customer_id?: string | null
          customer_initials?: string | null
          customer_last_name?: string | null
          customer_phone?: string | null
          customer_postcode?: string | null
          customer_street?: string | null
          customer_title?: string | null
          document_reference?: string | null
          download_count?: number | null
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
          first_downloaded_at?: string | null
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
          kleur_laksoort?: string | null
          last_downloaded_at?: string | null
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
          ready_at?: string | null
          reminder_due_date?: string | null
          reminder_sent_at?: string | null
          report_number?: string
          report_type?: string | null
          rim_type?: string | null
          security_present?: boolean | null
          security_type?: string | null
          sent_at?: string | null
          signed_at?: string | null
          smoke_detector?: boolean | null
          soort_bouw?: string | null
          staat_bij_opname?: string | null
          stalling?: string | null
          starter_battery?: boolean | null
          status?: string | null
          tellerstand?: number | null
          tellerstand_type?: string | null
          tire_advice?: string | null
          tire_bandenmaat?: string | null
          tire_bandenmaat_achter?: string | null
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
        Relationships: [
          {
            foreignKeyName: "reports_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
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
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      get_user_emails: {
        Args: never
        Returns: {
          email: string
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "appraiser"
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
    Enums: {
      app_role: ["admin", "appraiser"],
    },
  },
} as const
