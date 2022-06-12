<?php

class Collection implements JsonSerializable {
    private $id;

    private $collectionName;

    private $description;

    private $coverPhoto;

    public function __construct(int $id, string $collectionName, string $description, string $coverPhoto) {
        $this->id = $id;
        $this->collectionName = $collectionName;
        $this->description = $description;
        $this->coverPhoto = $coverPhoto;
    }

    /**
     * @return int
     */
    public function getId(): int {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getCollectionName(): string {
        return $this->collectionName;
    }

    /**
     * @return string
     */
    public function getDescription(): string {
        return $this->description;
    }

    /**
     * @return string
     */
    public function getCoverPhoto(): string {
        return $this->coverPhoto;
    }

    public function jsonSerialize(): array {
        return get_object_vars($this);
    }

    public static function createFromCollection(array $collection): Collection {
        return new Collection($collection['id'], $collection['collectionName'], $collection['description'], $collection['coverPhoto']);
    }
}