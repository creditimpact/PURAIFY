export interface BlueprintAction {
  type: string;
  params?: Record<string, any>;
}

export interface Blueprint {
  trigger: {
    type: string;
    [key: string]: any;
  };
  actions: BlueprintAction[];
}

export interface ValidationResult {
  valid: boolean;
  errors: { field: string; reason: string }[];
  warnings: { field: string; reason: string }[];
}
