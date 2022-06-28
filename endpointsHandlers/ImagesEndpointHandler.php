<?php

class ImagesEndpointHandler {

    public static function getImagesByCollectionId($selectedCollectionId): array {
        $sqlQuery = "SELECT * FROM `picture` WHERE collection_id = :collection_id";
        $selectStatement = (new Db())->getConnection()->prepare($sqlQuery);
        $selectStatement->execute(['collection_id' => $selectedCollectionId]);

        $allImagesBySelectedId = [];

        foreach ($selectStatement->fetchAll() as $image) {
            $allImagesBySelectedId[] = Photo::createFromAssoc($image);
        }

        return $allImagesBySelectedId;
    }

    public static function getSortedImagesByCollectionId($selectedCollectionId): array {
        $sqlQuery = "SELECT * FROM `picture` WHERE collection_id = :collection_id ORDER BY date ASC";
        $selectStatement = (new Db())->getConnection()->prepare($sqlQuery);
        $selectStatement->execute(['collection_id' => $selectedCollectionId]);

        $allImagesBySelectedId = [];

        foreach ($selectStatement->fetchAll() as $image) {
            $allImagesBySelectedId[] = Photo::createFromAssoc($image);
        }

        return $allImagesBySelectedId;
    }
}