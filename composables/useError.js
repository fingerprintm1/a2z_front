export function useErrors() {
  /**
   * Create a new Errors.
   */
  const errors = {};

  /**
   * Determine if an errors exists for the given field.
   *
   * @param {string} field
   */
  function has(field) {
    if (Object.keys(this.errors).length > 0) {
      return this.errors.hasOwnProperty(field);
    }
    return false;
  }

  /**
   * http://localhost:3000/profile Determine if we have any errors.
   */
  function any() {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * Retrieve the error message for a field.
   *
   * @param {string} field
   */
  function get(field) {
    if (this.errors[field]) {
      return this.errors[field];
    }
    // return this.errors
  }

  /**
   * Record the new errors.
   *
   * @param {object} errors
   */
  function record(errors) {
    if (errors) {
      this.errors = errors;
      return;
    }
    this.errors = {};
  }

  /**
   * Clear one or all error fields.
   *
   * @param {string|null} field
   */
  function clear(field) {
    if (field) {
      delete this.errors[field];
      return;
    }
    this.errors = {};
  }

  return {errors, has, any, get, record, clear};
}
