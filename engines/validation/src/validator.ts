import { Blueprint, ValidationResult } from './schema.js';

export function validateBlueprint(blueprint: any): ValidationResult {
  const errors: { field: string; reason: string }[] = [];
  const warnings: { field: string; reason: string }[] = [];

  if (!blueprint || typeof blueprint !== 'object') {
    errors.push({ field: 'blueprint', reason: 'object required' });
    return { valid: false, errors, warnings };
  }

  if (!blueprint.trigger || typeof blueprint.trigger !== 'object') {
    errors.push({ field: 'trigger', reason: 'trigger object required' });
  } else if (typeof blueprint.trigger.type !== 'string') {
    errors.push({ field: 'trigger.type', reason: 'string required' });
  }

  if (!Array.isArray(blueprint.actions)) {
    errors.push({ field: 'actions', reason: 'actions array required' });
  } else if (blueprint.actions.length === 0) {
    errors.push({ field: 'actions', reason: 'at least one action required' });
  } else {
    blueprint.actions.forEach((a: any, idx: number) => {
      if (!a || typeof a !== 'object') {
        errors.push({ field: `actions[${idx}]`, reason: 'action object required' });
        return;
      }
      if (typeof a.type !== 'string') {
        errors.push({ field: `actions[${idx}].type`, reason: 'string required' });
      }
      if (a.params && typeof a.params !== 'object') {
        errors.push({ field: `actions[${idx}].params`, reason: 'object expected' });
      }
    });
  }

  return { valid: errors.length === 0, errors, warnings };
}
