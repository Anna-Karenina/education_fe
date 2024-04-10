import { Box } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export const GameAreaId = "game-area";

export const GameArea = ({ children }: { children: ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: GameAreaId,
  });

  return (
    <Box
      ref={setNodeRef}
      h="100%"
      display="flex"
    >
      {children}
    </Box>
  );
};
