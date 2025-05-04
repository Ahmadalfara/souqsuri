
// This file is maintained for backward compatibility
// It re-exports all services from the modular implementation
import * as ListingServices from './listings';

// Export everything from the listings directory
export * from './listings';

// This allows existing code to continue working without changes
export default ListingServices;
