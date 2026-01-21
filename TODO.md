# TODO: Fix Antivirus License Status Display in Machine Cards

## Steps to Complete

- [x] Add `antVirusStatus` field to Machine interface in `src/types/machine.ts`
- [x] Modify `src/pages/MachinesPage.tsx` to use antivirus status from back-ativos backend
- [x] Update `src/components/MachineCard.tsx` to display `antVirusStatus` with correct Portuguese labels
- [x] Test the application to ensure statuses are displayed correctly

## Details

1. **Machine Interface Update**: Added `antVirusStatus?: string;` to the Machine type to hold the status from backend.

2. **MachinesPage Enhancement**: 
   - Removed license fetching and computation logic
   - Now relies on the back-ativos backend to provide `antVirusStatus` directly in machine data

3. **MachineCard Update**: Updated display logic to show 'Ativo' for 'ativo', 'Inativo' for 'inativo', or 'Sem Licença'

4. **License Service Update**: Removed client-side status computation, using backend-provided status instead.

5. **Testing**: Run the app and verify that machine cards show correct license statuses from back-ativos.
